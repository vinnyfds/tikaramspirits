# Deployment Strategy & Infrastructure (AWS + Supabase)

**Architecture Overview:**
[User (Browser)] -> [AWS Route 53 (DNS)] -> [AWS Amplify (Hosting/CDN)] -> [Next.js Server] <-> [Supabase (DB/Auth)]

---

## 1. The Environment Strategy
We will use **AWS Amplify Gen 2** (or Gen 1 Hosting) for the frontend. It natively supports Next.js 14 App Router, SSR, and API Routes.

### Environment Variables
You must configure these in the AWS Amplify Console under **Hosting > Environment variables**.

| Variable Key | Value Source | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard > Settings > API | Client-side connection. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard > Settings > API | Client-side public key. |
| `DATABASE_URL` | Supabase Dashboard > Settings > DB | **CRITICAL:** Use the "Transaction Pooler" connection string (Port 6543) for Serverless environments to prevent connection exhaustion. |
| `DIRECT_URL` | Supabase Dashboard > Settings > DB | Direct connection (Port 5432) for migrations only. |

---

## 2. Deployment Steps (AWS Amplify)

### Step A: Connect Repository
1.  Log in to AWS Console -> **AWS Amplify**.
2.  Click **"Create new app"** -> select **"GitHub"**.
3.  Authorize AWS to access your `tikaram-spirits` repository.
4.  Select the `main` branch.

### Step B: Build Settings (`amplify.yml`)
Amplify usually auto-detects Next.js, but ensure your build settings look like this to support the App Router:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*