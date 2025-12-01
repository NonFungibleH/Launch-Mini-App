# 📦 Deployment Guide for Launch Mini App

Complete step-by-step guide to deploy your token creation mini app.

## Phase 1: Local Development

### Step 1: Get Thirdweb Client ID

1. Visit [https://thirdweb.com/dashboard](https://thirdweb.com/dashboard)
2. Sign in or create an account
3. Click "Create Project" or use existing project
4. Navigate to "Settings" → "API Keys"
5. Copy your Client ID

### Step 2: Set Up Project

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_actual_client_id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Create Images

You need two images in the `/public` folder:

**icon.png** (512x512px)
- Square app icon
- Base blue (#0052FF) themed
- Show rocket or "L" logo
- Clean, simple design

**splash.png** (1200x630px)
- Wide splash screen
- Base gradient background
- "Launch" branding
- Tagline: "Create your token"

You can use Figma, Canva, or any design tool.

### Step 4: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and verify:
- ✅ App loads without errors
- ✅ Forms work properly
- ✅ UI looks good on mobile size
- ✅ Tabs switch correctly

## Phase 2: Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Launch mini app"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/launch-mini-app.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Import Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID = your_client_id
   NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
   ```
   (Use the Vercel URL you'll get after first deployment)

6. Click "Deploy"

### Step 3: Update Environment Variable

After first deployment:

1. Copy your Vercel URL (e.g., `launch-mini-app.vercel.app`)
2. In Vercel Dashboard → Your Project → Settings → Environment Variables
3. Edit `NEXT_PUBLIC_APP_URL` to your Vercel URL
4. Redeploy from Deployments tab

### Step 4: Disable Deployment Protection

**This is critical for mini apps!**

1. Vercel Dashboard → Your Project → Settings
2. Navigate to "Deployment Protection"
3. Toggle "Vercel Authentication" to **OFF**
4. Click "Save"

This allows the Base app to access your mini app manifest.

## Phase 3: Configure Mini App

### Step 1: Verify Manifest

Visit your manifest URL in a browser:
```
https://your-app.vercel.app/.well-known/farcaster.json
```

You should see JSON with your app details. If you get 404, check:
- Route file exists at `app/.well-known/farcaster.json/route.ts`
- Vercel deployment succeeded
- Clear browser cache

### Step 2: Generate Account Association

1. Visit [Base Build Tools](https://www.base.dev/preview?tab=account)

2. Enter your domain (just the domain, no https://):
   ```
   your-app.vercel.app
   ```

3. Click "Submit"

4. Click "Verify" button that appears

5. You'll be prompted to sign with your Farcaster account
   - Use Warpcast mobile app to scan QR code
   - Or use custody address if you have it

6. After signing, you'll see three fields:
   - `header`
   - `payload`
   - `signature`

7. Copy all three values

### Step 3: Update Manifest Config

1. Open `minikit.config.ts` in your code

2. Replace the `accountAssociation` section:
   ```typescript
   accountAssociation: {
     header: "YOUR_HEADER_VALUE",
     payload: "YOUR_PAYLOAD_VALUE",
     signature: "YOUR_SIGNATURE_VALUE"
   }
   ```

3. Commit and push:
   ```bash
   git add minikit.config.ts
   git commit -m "Add account association"
   git push
   ```

Vercel will automatically redeploy.

## Phase 4: Test Mini App

### Step 1: Use Preview Tool

1. Visit [Base Preview Tool](https://www.base.dev/preview)

2. Enter your app URL:
   ```
   https://your-app.vercel.app
   ```

3. Check the preview tabs:
   - **Embed Preview**: How your app appears in feeds
   - **Launch Button**: Test opening the app
   - **Account Association**: Verify credentials
   - **Metadata**: Check all fields are populated

4. Fix any issues shown and redeploy

### Step 2: Test with ngrok (Optional)

If you want to test local changes:

```bash
# Terminal 1
npm run dev

# Terminal 2
ngrok http 3000
```

Use the ngrok URL in the preview tool.

## Phase 5: Publish

### Step 1: Create Launch Cast

1. Open Warpcast (mobile or desktop)

2. Create a new cast with your app URL:
   ```
   🚀 Just launched Launch - create your own token on Base in seconds!

   https://your-app.vercel.app

   Try it out and let me know what you think! 
   ```

3. Post the cast

### Step 2: Verify Embed

Your cast should show:
- App icon
- "Launch" title
- Description
- "Open" or "Launch" button

If embed doesn't appear:
- Wait a few minutes (caching)
- Check manifest is accessible
- Verify metadata in preview tool

### Step 3: Test User Flow

Click the button in your cast and verify:
1. ✅ Mini app opens
2. ✅ UI loads correctly
3. ✅ Can switch between tabs
4. ✅ Form inputs work
5. ✅ Token creation flow works

## Phase 6: Implement Real Token Deployment

Currently, the app creates mock tokens. To enable real deployment:

### Update CreateTokenForm.tsx

Replace the mock deployment code with actual Thirdweb deployment:

```typescript
// Import at top
import { deployContract } from "thirdweb/deploys";

// In handleSubmit function, replace mock code with:
const contract = await deployContract({
  client,
  chain,
  account, // from useActiveAccount()
  deployParams: {
    name: formData.name,
    symbol: formData.symbol,
    totalSupply: formData.totalSupply,
  },
  type: "TokenERC20",
});

const newToken: Token = {
  name: formData.name,
  symbol: formData.symbol,
  totalSupply: formData.totalSupply,
  contractAddress: contract.address,
  createdAt: new Date().toISOString(),
  txHash: contract.deployTransaction.hash,
};
```

This requires users to actually sign transactions and pay gas.

## Troubleshooting

### Manifest 404 Error
- Check `app/.well-known/farcaster.json/route.ts` exists
- Verify Vercel deployment succeeded
- Test manifest URL directly in browser

### App Won't Open
- Verify Deployment Protection is OFF
- Check account association is correct
- Test with Preview Tool first

### Wallet Connection Fails
- Ensure user has Base app installed
- Check Thirdweb Client ID is correct
- Verify chain is set to Base (id: 8453)

### Images Don't Load
- Verify images are in `/public` folder
- Check image paths in `minikit.config.ts`
- Try hard refresh (Cmd/Ctrl + Shift + R)

## Next Steps

Once V1 is live:

1. **Gather Feedback**: Share with community, collect user feedback
2. **Monitor Usage**: Check Vercel analytics
3. **Plan V2**: Implement Uniswap pool creation
4. **Marketing**: Promote in Farcaster and Base communities

## Support Resources

- [Base Discord](https://discord.gg/base) - #mini-apps channel
- [Thirdweb Discord](https://discord.gg/thirdweb)
- [Farcaster Docs](https://miniapps.farcaster.xyz/)
- [Base Docs](https://docs.base.org/mini-apps/)

---

**Ready to launch? Let's go! 🚀**
