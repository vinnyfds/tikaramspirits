# Deployment Lessons Learned: AWS Amplify + Next.js 14

**Date:** December 2024  
**Project:** Tikaram Spirits  
**Deployment Platform:** AWS Amplify  
**Framework:** Next.js 14 (App Router)

---

## Table of Contents

1. [Overview](#overview)
2. [TypeScript Errors During Deployment](#typescript-errors-during-deployment)
3. [Writing Deployment-Safe Code](#writing-deployment-safe-code)
4. [Dependency Management](#dependency-management)
5. [Environment Variables](#environment-variables)
6. [Build Configuration](#build-configuration)
7. [Best Practices Checklist](#best-practices-checklist)

---

## Overview

This document captures critical lessons learned during the AWS Amplify deployment process. Many issues that appear during deployment can be caught and fixed during development if proper practices are followed.

**Key Insight:** Local development environments are often more forgiving than production builds. TypeScript strict mode, ESLint checks, and dependency resolution behave differently in CI/CD environments.

---

## TypeScript Errors During Deployment

### 1. Type Narrowing Errors

**Problem:** TypeScript's type narrowing can cause errors when comparing values that TypeScript knows can never overlap.

**Example Error:**
```typescript
// ❌ BAD - This will fail in strict mode
{step === 'initial' ? (
  <Input disabled={step === 'submitting'} /> // Error: types have no overlap
) : null}
```

**Why It Happens:**
- Inside the `step === 'initial'` block, TypeScript narrows `step` to only `'initial'`
- Comparing `'initial' === 'submitting'` is impossible, so TypeScript flags it as an error
- Local dev might not catch this if strict type checking isn't enabled

**Solution:**
```typescript
// ✅ GOOD - Remove impossible checks
{step === 'initial' ? (
  <Input /> // No need to check 'submitting' here
) : null}
```

**Prevention:**
- Always run `npm run build` locally before pushing
- Enable strict TypeScript mode in `tsconfig.json`
- Use type guards properly and avoid redundant checks

---

### 2. API Compatibility Errors

**Problem:** Using deprecated or incorrect API signatures that don't match library types.

**Example Error:**
```typescript
// ❌ BAD - Using deprecated cookie methods
cookies: {
  getAll() { ... },  // Error: doesn't exist in CookieMethodsServerDeprecated
  remove() { ... }   // Error: doesn't exist in CookieMethodsServer
}
```

**Why It Happens:**
- Library APIs evolve between versions
- Type definitions are stricter in production builds
- Local node_modules might have different versions than CI/CD

**Solution:**
```typescript
// ✅ GOOD - Use correct API for current version
cookies: {
  getAll() {
    return cookieStore.getAll().map((cookie) => ({
      name: cookie.name,
      value: cookie.value,
    }))
  },
  setAll(cookiesToSet) {
    cookiesToSet.forEach(({ name, value, options }) =>
      cookieStore.set(name, value, options)
    )
  },
}
```

**Prevention:**
- Check library documentation for current API
- Review type definitions: `node_modules/@package/dist/types.d.ts`
- Test with same dependency versions as production
- Use `npm ci` instead of `npm install` to lock versions

---

### 3. Type Assertion Errors

**Problem:** Unsafe type assertions that TypeScript 5+ rejects.

**Example Error:**
```typescript
// ❌ BAD - Unsafe assertion
const mappedStores = data
  .map((row) => row.stores)
  .filter((store): store is Store => store !== null) as Store[]
// Error: Conversion of type 'any[][]' to type 'Store[]' may be a mistake
```

**Why It Happens:**
- TypeScript 5+ is stricter about type conversions
- Production builds use stricter type checking
- `any` types propagate and cause inference issues

**Solution:**
```typescript
// ✅ GOOD - Proper type definition and conversion
type StoreRow = { stores: Store | null }

const rows = data as unknown as StoreRow[]
const mappedStores: Store[] = rows
  .map((row) => row.stores)
  .filter((store): store is Store => store !== null)
```

**Prevention:**
- Define proper types instead of using `any`
- Use `as unknown as TargetType` pattern when necessary
- Let TypeScript infer types where possible
- Avoid `as` assertions unless absolutely necessary

---

### 4. Router API Mismatch Errors

**Problem:** Using APIs from Pages Router in App Router or vice versa.

**Example Error:**
```typescript
// ❌ BAD - UrlObject not supported in App Router
router.push({ pathname: '/spirits', query: { id: '123' } })
// Error: Argument of type 'UrlObject' is not assignable to parameter of type 'string'
```

**Why It Happens:**
- Next.js App Router has different APIs than Pages Router
- `router.push()` in App Router only accepts strings
- Local dev might not catch this if using wrong router

**Solution:**
```typescript
// ✅ GOOD - Convert to string or use string directly
function hrefToString(href: LinkProps['href']): string {
  if (typeof href === 'string') return href
  if (href && typeof href === 'object') {
    const { pathname, query } = href
    if (query) {
      const searchParams = new URLSearchParams(
        Object.entries(query).map(([k, v]) => [k, String(v)])
      ).toString()
      return searchParams ? `${pathname}?${searchParams}` : pathname
    }
    return pathname || '/'
  }
  return '/'
}

router.push(hrefToString(href))
```

**Prevention:**
- Know which router you're using (App Router vs Pages Router)
- Check Next.js documentation for correct API
- Use TypeScript to catch API mismatches
- Test navigation in both dev and build modes

---

## Writing Deployment-Safe Code

### 1. Always Run Production Build Locally

**Critical Practice:**
```bash
# Before every commit
npm run build
```

**Why:**
- Catches TypeScript errors early
- Identifies missing environment variables
- Reveals import/export issues
- Matches production build behavior

**Add to Pre-commit Hook:**
```json
{
  "scripts": {
    "precommit": "npm run build",
    "build": "next build"
  }
}
```

---

### 2. Use Strict TypeScript Configuration

**Recommended `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Benefits:**
- Catches errors during development
- Prevents deployment failures
- Improves code quality
- Better IDE support

---

### 3. Avoid Type Assertions When Possible

**Bad:**
```typescript
const data = response.data as User[]
```

**Good:**
```typescript
interface User {
  id: string
  name: string
}

const data: User[] = response.data
// Or better: validate and type guard
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj
}

const data = response.data.filter(isUser)
```

---

### 4. Handle Environment Variables Properly

**Problem:** Missing or incorrect environment variables cause runtime errors.

**Solution:**
```typescript
// ✅ GOOD - Validate and provide defaults
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set')
}

// Or with defaults
const apiKey = process.env.API_KEY || 'development-key'
```

**Prevention:**
- Document all required environment variables
- Use `.env.example` file
- Validate in application startup
- Use TypeScript to catch missing variables

---

### 5. Test with Production-Like Environment

**Local Testing:**
```bash
# Use same Node version as production
nvm use 18

# Use same package manager flags
npm ci --legacy-peer-deps

# Build with production settings
NODE_ENV=production npm run build
```

---

## Dependency Management

### 1. Resolve Dependency Conflicts Early

**Problem:** `npm ci` fails in CI/CD due to peer dependency conflicts.

**Symptoms:**
```
ERESOLVE unable to resolve dependency tree
Peer eslint@8.x is required but eslint@9.x is installed
```

**Solutions:**

**Option A: Use Legacy Peer Deps (Temporary)**
```yaml
# amplify.yml
preBuild:
  commands:
    - npm install --legacy-peer-deps
```

**Option B: Fix Dependencies Properly**
```bash
# Upgrade conflicting packages
npm install eslint@^9.0.0 --save-dev

# Or downgrade to compatible versions
npm install eslint@^8.57.0 --save-dev
```

**Prevention:**
- Check peer dependencies before installing packages
- Use `npm ls` to identify conflicts
- Resolve conflicts during development, not deployment
- Document known conflicts in README

---

### 2. Lock Dependency Versions

**Use `package-lock.json`:**
```bash
# Commit package-lock.json
git add package-lock.json
git commit -m "chore: lock dependency versions"
```

**Benefits:**
- Consistent installs across environments
- Reproducible builds
- Easier debugging

---

### 3. Specify Node.js Version

**Create `.nvmrc`:**
```
18
```

**Update `amplify.yml`:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 18  # Or use .nvmrc
        - npm ci
```

**Prevention:**
- Match Node version across dev/staging/production
- Document required Node version in README
- Use `.nvmrc` for consistency

---

### 4. Handle ESLint Version Conflicts

**Problem:** ESLint 9 incompatible with `eslint-config-next@16.0.4`.

**Solution:**
```bash
# Option 1: Upgrade Next.js (when available)
npm install next@^15.0.0

# Option 2: Downgrade ESLint (if Next.js doesn't support ESLint 9)
npm install eslint@^8.57.0 --save-dev

# Option 3: Use legacy peer deps (temporary)
npm install --legacy-peer-deps
```

**Prevention:**
- Check compatibility before upgrading
- Test linting after dependency changes
- Monitor library release notes for breaking changes

---

## Environment Variables

### 1. Inject Variables During Build

**Problem:** Environment variables not available during Next.js compilation.

**Solution in `amplify.yml`:**
```yaml
build:
  commands:
    # Inject environment variables for Next.js compilation
    - echo "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" >> .env.production
    - echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY" >> .env.production
    - npm run build
```

**Prevention:**
- Document which variables are needed at build time (`NEXT_PUBLIC_*`)
- Test build with environment variables set
- Use `.env.production` for production builds

---

### 2. Use Correct Variable Prefixes

**Next.js Environment Variables:**
- `NEXT_PUBLIC_*` - Available in browser and server (exposed to client)
- `*` (no prefix) - Server-only (not exposed to client)

**Example:**
```typescript
// ✅ GOOD - Public variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// ✅ GOOD - Server-only variable
const secretKey = process.env.SECRET_KEY // Only available server-side
```

**Prevention:**
- Never expose secrets with `NEXT_PUBLIC_` prefix
- Use server-only variables for API keys, database URLs
- Document which variables are public vs private

---

## Build Configuration

### 1. Optimize Build Commands

**Recommended `amplify.yml`:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --legacy-peer-deps  # Or fix dependencies properly
    build:
      commands:
        # Inject environment variables
        - echo "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" >> .env.production
        - echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY" >> .env.production
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

---

### 2. Handle Build Cache

**Benefits:**
- Faster subsequent builds
- Reduced build costs
- Better CI/CD performance

**Configuration:**
```yaml
cache:
  paths:
    - node_modules/**/*
    - .next/cache/**/*
```

---

## Best Practices Checklist

### Before Starting Development

- [ ] Set up strict TypeScript configuration
- [ ] Configure ESLint with Next.js preset
- [ ] Document required environment variables
- [ ] Set up `.env.example` file
- [ ] Choose and lock Node.js version
- [ ] Review and resolve peer dependencies
- [ ] Set up pre-commit hooks for type checking

### During Development

- [ ] Run `npm run build` before every commit
- [ ] Fix TypeScript errors immediately
- [ ] Avoid `any` types
- [ ] Use proper type guards
- [ ] Test with production build locally
- [ ] Keep dependencies up to date (carefully)
- [ ] Document API changes

### Before Deployment

- [ ] Run full production build locally
- [ ] Verify all environment variables are set
- [ ] Check for TypeScript errors: `npx tsc --noEmit`
- [ ] Test linting: `npm run lint`
- [ ] Review build logs for warnings
- [ ] Verify dependency versions match production
- [ ] Test in staging environment if available

### During Deployment

- [ ] Monitor build logs carefully
- [ ] Check for TypeScript compilation errors
- [ ] Verify environment variables are injected
- [ ] Watch for dependency resolution issues
- [ ] Test deployed application thoroughly

### After Deployment

- [ ] Verify application works in production
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Document any issues encountered
- [ ] Update this document with new learnings

---

## Common Error Patterns and Solutions

### Pattern 1: Type Narrowing Issues

**Error:** `This comparison appears to be unintentional because the types have no overlap`

**Cause:** Comparing values that TypeScript knows can never be equal

**Fix:** Remove redundant checks or restructure conditional logic

---

### Pattern 2: API Version Mismatch

**Error:** `No overload matches this call` or `Property does not exist`

**Cause:** Using deprecated or incorrect API methods

**Fix:** Check library documentation and update to current API

---

### Pattern 3: Dependency Conflicts

**Error:** `ERESOLVE unable to resolve dependency tree`

**Cause:** Peer dependency version conflicts

**Fix:** Resolve conflicts by upgrading/downgrading packages or using `--legacy-peer-deps`

---

### Pattern 4: Missing Type Definitions

**Error:** `Cannot find module` or `has no exported member`

**Cause:** Missing or incorrect type definitions

**Fix:** Install `@types/package-name` or update package versions

---

## Key Takeaways

1. **Always build locally before deploying** - Most errors can be caught early
2. **Use strict TypeScript** - Prevents many runtime errors
3. **Resolve dependencies early** - Don't wait until deployment
4. **Test with production settings** - Dev and prod behave differently
5. **Document everything** - Environment variables, dependencies, configurations
6. **Monitor build logs** - They tell you exactly what's wrong
7. **Keep dependencies updated** - But test thoroughly after updates

---

## Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [AWS Amplify Hosting Guide](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [Supabase SSR Documentation](https://supabase.com/docs/guides/auth/server-side/nextjs)

---

## Revision History

- **2024-12-01**: Initial document created based on AWS Amplify deployment experience
- Documented TypeScript errors, dependency issues, and build configuration

---

**Remember:** The best way to avoid deployment errors is to catch them during development. Invest time in proper tooling, strict type checking, and local testing.


