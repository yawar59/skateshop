# Backend Setup Guide for Skateshop

This guide will help you set up the complete backend so you can access authenticated pages in the Skateshop application.

## Prerequisites

The Skateshop application requires the following services:
- **PostgreSQL Database** (for storing products, stores, orders, users)
- **Clerk** (for authentication)
- **Stripe** (for payments)
- **UploadThing** (for file uploads)
- **Resend** (for emails)
- **Upstash Redis** (for rate limiting)

## Step 1: Set Up Database

### Option A: Use Neon (Recommended - Free Tier Available)

1. Go to [Neon](https://neon.tech/) and create a free account
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:pass@ep-xxx.neon.tech/neondb`)
4. Update `.env`:
   ```bash
   DATABASE_URL="your-neon-connection-string"
   ```

### Option B: Use Supabase (Free Tier Available)

1. Go to [Supabase](https://supabase.com/) and create a project
2. Go to Settings → Database → Connection String → URI
3. Copy the connection string
4. Update `.env`:
   ```bash
   DATABASE_URL="your-supabase-connection-string"
   ```

### Option C: Use Railway (Free Tier Available)

1. Go to [Railway](https://railway.app/) and create a project
2. Add a PostgreSQL database
3. Copy the `DATABASE_URL` from the Variables tab
4. Update `.env`

## Step 2: Set Up Clerk Authentication

1. Go to [Clerk](https://clerk.com/) and create a free account
2. Create a new application
3. In the Clerk Dashboard:
   - Go to **API Keys**
   - Copy the **Publishable Key** and **Secret Key**
4. Update `.env`:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your-key-here"
   CLERK_SECRET_KEY="sk_test_your-key-here"
   ```
5. Configure URLs in Clerk:
   - Go to **Paths** in Clerk Dashboard
   - Set Sign-in URL: `/signin`
   - Set Sign-up URL: `/signup`
   - Set After sign-in URL: `/`
   - Set After sign-up URL: `/`

## Step 3: Set Up Stripe (For Payments)

1. Go to [Stripe](https://stripe.com/) and create an account
2. Use **Test Mode** (toggle in the dashboard)
3. Go to **Developers → API Keys**
4. Copy the **Publishable Key** and **Secret Key**
5. Update `.env`:
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-key-here"
   STRIPE_API_KEY="sk_test_your-key-here"
   ```
6. Create Products in Stripe:
   - Go to **Products** → **Add Product**
   - Create two subscription products: "Standard" and "Pro"
   - Copy the Price IDs and update `.env`:
   ```bash
   STRIPE_STD_MONTHLY_PRICE_ID="price_xxx"
   STRIPE_PRO_MONTHLY_PRICE_ID="price_xxx"
   ```

## Step 4: Set Up UploadThing (For File Uploads)

1. Go to [UploadThing](https://uploadthing.com/) and sign in with GitHub
2. Create a new app
3. Copy the **App ID** and **Secret**
4. Update `.env`:
   ```bash
   UPLOADTHING_SECRET="sk_live_your-secret"
   UPLOADTHING_APP_ID="your-app-id"
   ```

## Step 5: Set Up Resend (For Emails)

1. Go to [Resend](https://resend.com/) and create an account
2. Go to **API Keys** and create a new key
3. Update `.env`:
   ```bash
   RESEND_API_KEY="re_your-key-here"
   EMAIL_FROM_ADDRESS="onboarding@resend.dev"
   ```
   Note: Use "onboarding@resend.dev" for testing, or verify your own domain

## Step 6: Set Up Upstash Redis (For Rate Limiting)

1. Go to [Upstash](https://upstash.com/) and create an account
2. Create a new Redis database
3. Copy the **REST URL** and **REST Token**
4. Update `.env`:
   ```bash
   UPSTASH_REDIS_REST_URL="https://your-db.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="your-token-here"
   ```

## Step 7: Initialize Database

1. Push the database schema:
   ```bash
   cd /workspace/mighty-tide-9067
   bun run db:push
   ```

2. (Optional) Seed the database with sample data:
   ```bash
   bun run db:seed
   ```

## Step 8: Restore Middleware and Restart

1. Restore the original middleware (it was modified for preview):
   ```bash
   cd /workspace/mighty-tide-9067
   cp src/middleware.ts.backup src/middleware.ts
   ```

2. Restore user queries:
   ```bash
   cp src/lib/queries/user.ts.backup src/lib/queries/user.ts
   ```

3. Restart the development server:
   ```bash
   pm2 restart repo-app
   ```

## Step 9: Test Authentication

1. Visit: `http://localhost:3002/signup`
2. Create a new account
3. Sign in
4. Access protected pages:
   - `/dashboard/billing` - Manage subscriptions
   - `/dashboard/purchases` - View purchases
   - `/dashboard/settings` - User settings
   - `/dashboard/account` - Account management

## Quick Setup (Minimal for Testing)

If you just want to test authentication quickly, you only need:

1. **Database**: Neon (free tier)
2. **Clerk**: Free tier
3. Skip Stripe, UploadThing, Resend, Upstash (they're optional for basic testing)

For optional services, the app will still work but features like:
- Payments won't work without Stripe
- File uploads won't work without UploadThing
- Newsletter won't work without Resend
- Rate limiting won't work without Upstash

## Troubleshooting

### "Database connection failed"
- Check your `DATABASE_URL` is correct
- Ensure the database is running and accessible
- Try running `bun run db:push` again

### "Clerk: Invalid publishable key"
- Make sure you're using the correct keys from Clerk dashboard
- Check that keys start with `pk_test_` and `sk_test_`

### "Middleware redirect loop"
- Ensure Clerk paths are configured correctly
- Check that `/signin` and `/signup` routes exist

### Pages still showing as unauthenticated
- Clear browser cookies
- Sign out and sign in again
- Check that middleware is restored properly

## Environment Variables Summary

Required for authentication:
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

Optional for full functionality:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_API_KEY="sk_test_..."
STRIPE_STD_MONTHLY_PRICE_ID="price_..."
STRIPE_PRO_MONTHLY_PRICE_ID="price_..."
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="..."
RESEND_API_KEY="re_..."
EMAIL_FROM_ADDRESS="..."
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
```
