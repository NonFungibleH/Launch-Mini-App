# 🚀 Launch - Token Creation Mini App

Create your own ERC-20 tokens on Base in seconds. Built as a Farcaster mini app with Thirdweb integration.

## Features

- **Simple Token Creation**: Just name, symbol, and supply - that's it!
- **Instant Deployment**: Deploy ERC-20 tokens directly to Base
- **Token History**: Track all tokens you've created with contract addresses
- **Base Themed UI**: Beautiful, mobile-optimized interface
- **Secure**: Uses Thirdweb's audited contracts

## Prerequisites

- Node.js 18+ installed
- A Thirdweb account and Client ID ([Get one here](https://thirdweb.com/dashboard))
- A Farcaster account for testing

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd launch-mini-app

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Thirdweb Client ID:

```
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing as a Mini App

To test in the Base app, you need to make your local app accessible via a public URL:

### Using ngrok (Recommended)

```bash
# Install ngrok
npm install -g ngrok

# Start your dev server
npm run dev

# In another terminal, create tunnel
ngrok http 3000
```

Copy the ngrok URL (e.g., `https://abc123.ngrok.io`) and use it in the Base app preview tool.

### Using Cloudflare Tunnel

```bash
# Install cloudflared
# Visit: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

# Start tunnel
cloudflared tunnel --url http://localhost:3000
```

## Deployment to Production

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
     - `NEXT_PUBLIC_APP_URL` (will be your Vercel URL)
   - Deploy!

3. **Update Environment Variables**
   - After deployment, update `NEXT_PUBLIC_APP_URL` with your Vercel URL
   - Redeploy

### Configure Account Association

After deploying, you need to verify your app ownership:

1. Ensure your app is live and the manifest is accessible at:
   `https://your-domain.com/.well-known/farcaster.json`

2. Turn off Vercel Deployment Protection:
   - Go to Vercel Dashboard → Your Project → Settings → Deployment Protection
   - Toggle "Vercel Authentication" to OFF
   - Save

3. Generate Account Association:
   - Visit [Base Build Account Association Tool](https://www.base.dev/preview?tab=account)
   - Enter your domain (e.g., `your-app.vercel.app`)
   - Click "Submit" then "Verify"
   - Follow instructions to sign with your Farcaster account

4. Update `minikit.config.ts`:
   - Copy the generated `accountAssociation` object
   - Replace the placeholder values in `minikit.config.ts`
   - Commit and push changes

## Publishing Your Mini App

1. **Preview Your App**
   - Visit [Base Preview Tool](https://www.base.dev/preview)
   - Enter your app URL
   - Verify embeds and functionality

2. **Share on Farcaster**
   - Post your app URL in a cast
   - Users can tap the "Launch" button to open your mini app

3. **Submit to Base App**
   - Once tested, your app will be discoverable in the Base app

## Project Structure

```
launch-mini-app/
├── app/
│   ├── .well-known/
│   │   └── farcaster.json/
│   │       └── route.ts          # Manifest endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main app page
├── components/
│   ├── CreateTokenForm.tsx       # Token creation form
│   ├── TokenHistory.tsx          # Display created tokens
│   └── ThirdwebProvider.tsx     # Thirdweb context
├── lib/
│   └── thirdweb.ts              # Thirdweb client config
├── types/
│   └── index.ts                 # TypeScript types
├── public/
│   ├── icon.png                 # App icon (512x512)
│   └── splash.png               # Splash screen (1200x630)
├── minikit.config.ts            # Mini app manifest config
└── package.json
```

## Customization

### Branding

1. **Images**: Replace placeholder images in `/public`:
   - `icon.png` - 512x512px app icon
   - `splash.png` - 1200x630px splash screen

2. **Colors**: Edit `tailwind.config.ts` to customize the Base theme colors

3. **Text**: Update app name and descriptions in:
   - `minikit.config.ts`
   - `app/layout.tsx`
   - `app/page.tsx`

### Thirdweb Integration

Currently using mock deployment. To implement real token deployment:

1. Install Thirdweb contracts package
2. Use `deployContract` or `prepareContractCall` from Thirdweb SDK
3. Update `CreateTokenForm.tsx` with actual deployment logic
4. See [Thirdweb docs](https://portal.thirdweb.com/) for details

## Phase 2 Plans

Future enhancements to consider:

- **Uniswap Pool Creation**: Automatically create liquidity pool on deployment
- **Token Analytics**: Show token price and volume
- **Trading Interface**: Buy/sell tokens directly in the app
- **Social Features**: Share token launches, leaderboards
- **Advanced Options**: Custom decimals, max supply, mintable/burnable

## Resources

- [Base Mini Apps Documentation](https://docs.base.org/mini-apps/)
- [Farcaster Mini Apps SDK](https://miniapps.farcaster.xyz/)
- [Thirdweb Documentation](https://portal.thirdweb.com/)
- [Base Developer Portal](https://base.org/developers)

## Support

For issues or questions:
- Check the [Base Mini Apps Discord](https://discord.gg/base)
- Review [Thirdweb Community](https://thirdweb.com/community)
- Open an issue in this repository

## License

MIT License - feel free to fork and customize!

---

Built with ❤️ on Base
