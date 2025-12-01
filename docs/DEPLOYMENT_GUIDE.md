# AWS Amplify Deployment Guide

## Prerequisites ✅
- AWS CLI configured (✅ Verified)
- GitHub repository connected (✅ Verified: `vinnyfds/tikaramspirits`)
- `amplify.yml` configured (✅ Ready)

## Method 1: AWS Console (Recommended)

### Step 1: Create Amplify App
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Select **"GitHub"** as your source
4. Authorize AWS to access your GitHub account (if first time)
5. Select repository: `vinnyfds/tikaramspirits`
6. Select branch: `master` (or `main` if that's your default)
7. Click **"Next"**

### Step 2: Configure Build Settings
- AWS Amplify will auto-detect Next.js
- Verify the build settings match `amplify.yml`:
  - Build command: `npm run build`
  - Output directory: `.next`
- Click **"Next"**

### Step 3: Environment Variables (CRITICAL)
Add these environment variables in the Amplify Console:

| Variable Name | Where to Get It | Notes |
|--------------|----------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API | Your Supabase anon/public key |
| `DATABASE_URL` | Supabase Dashboard → Settings → Database → Connection Pooling | Use **Transaction Pooler** (port 6543) for serverless |
| `RESEND_API_KEY` | Resend Dashboard | If using email functionality |

**Important:** 
- Use the **Transaction Pooler** connection string (port 6543) for `DATABASE_URL`
- This prevents connection exhaustion in serverless environments

### Step 4: Review & Deploy
1. Review all settings
2. Click **"Save and deploy"**
3. Wait for build to complete (5-10 minutes)

### Step 5: Custom Domain (Optional)
After deployment:
1. Go to **App settings** → **Domain management**
2. Add your custom domain: `tikaramspirits.com`
3. Follow DNS configuration instructions

---

## Method 2: AWS CLI (Advanced)

If you prefer CLI deployment, you can use AWS CLI to create the app:

```bash
# Create Amplify app
aws amplify create-app \
  --name tikaram-spirits \
  --repository https://github.com/vinnyfds/tikaramspirits \
  --platform WEB \
  --environment-variables \
    NEXT_PUBLIC_SUPABASE_URL=your-url,NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# Create branch
aws amplify create-branch \
  --app-id <app-id> \
  --branch-name master

# Start deployment
aws amplify start-job \
  --app-id <app-id> \
  --branch-name master \
  --job-type RELEASE
```

**Note:** Console method is easier for first-time setup and environment variable management.

---

## Post-Deployment Checklist

- [ ] Verify site loads at Amplify URL
- [ ] Test age gate functionality
- [ ] Test store locator
- [ ] Verify images load from S3
- [ ] Test form submissions
- [ ] Check API routes work
- [ ] Configure custom domain (if needed)
- [ ] Set up SSL certificate (auto-configured by Amplify)

---

## Troubleshooting

### Build Fails
- Check build logs in Amplify Console
- Verify Node.js version (should be 18+)
- Ensure all environment variables are set

### Environment Variables Not Working
- Variables must be prefixed with `NEXT_PUBLIC_` for client-side access
- Restart build after adding variables

### Images Not Loading
- Verify S3 bucket permissions
- Check `next.config.js` remote patterns
- Ensure CORS is configured on S3 bucket

---

## Next Steps After Deployment

1. **Monitor Builds**: Check Amplify Console for build status
2. **Set Up Custom Domain**: Configure DNS in Amplify Console
3. **Enable CDN**: Amplify automatically provides CDN
4. **Set Up Branch Previews**: Enable preview deployments for PRs

