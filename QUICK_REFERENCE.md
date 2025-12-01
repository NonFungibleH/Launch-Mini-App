# ⚡ Quick Reference

Fast access to common commands, links, and info.

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🌐 Important URLs

### Your App
- **Local Dev**: http://localhost:3000
- **Production**: https://your-app.vercel.app
- **Manifest**: https://your-app.vercel.app/.well-known/farcaster.json

### Tools & Dashboards
- **Thirdweb Dashboard**: https://thirdweb.com/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Base Preview**: https://www.base.dev/preview
- **Account Association**: https://www.base.dev/preview?tab=account
- **BaseScan**: https://basescan.org

### Documentation
- **Base Mini Apps**: https://docs.base.org/mini-apps/
- **Farcaster SDK**: https://miniapps.farcaster.xyz/
- **Thirdweb Docs**: https://portal.thirdweb.com/
- **Next.js Docs**: https://nextjs.org/docs

### Community
- **Base Discord**: https://discord.gg/base
- **Farcaster**: https://warpcast.com
- **Thirdweb Discord**: https://discord.gg/thirdweb

---

## 📦 Project Structure

```
launch-mini-app/
├── app/                    # Next.js pages
│   ├── page.tsx           # Main app
│   ├── layout.tsx         # Root layout
│   └── .well-known/       # Manifest
├── components/            # React components
│   ├── CreateTokenForm    # Creation form
│   ├── TokenHistory       # History view
│   └── ThirdwebProvider   # Context
├── lib/                   # Utils
│   └── thirdweb.ts       # Config
├── types/                 # TypeScript
│   └── index.ts          # Definitions
└── public/                # Assets
    ├── icon.png          # 512x512
    └── splash.png        # 1200x630
```

---

## 🎨 Design Specs

### Colors (Base Theme)
```css
Blue:       #0052FF
Light Blue: #4A90FF
Dark:       #050A14
Gray:       #8A8F98
Light:      #F4F4F4
```

### Images Required
- **icon.png**: 512×512px, PNG
- **splash.png**: 1200×630px, PNG

---

## 🔑 Environment Variables

```bash
# .env.local
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

---

## 📋 Common Tasks

### Update Manifest
1. Edit `minikit.config.ts`
2. Commit: `git add . && git commit -m "Update manifest"`
3. Push: `git push`
4. Wait for Vercel deploy

### Fix Deployment Issues
```bash
# Check Vercel logs
vercel logs

# Redeploy
vercel --prod

# Check environment variables
vercel env ls
```

### Test Locally with Tunnel
```bash
# Terminal 1
npm run dev

# Terminal 2
ngrok http 3000
# or
cloudflared tunnel --url http://localhost:3000
```

### Deploy Updates
```bash
git add .
git commit -m "Your message"
git push
# Vercel auto-deploys
```

---

## 🐛 Troubleshooting

### App won't load
1. Check `.env.local` exists
2. Verify Client ID is set
3. Run `npm install` again
4. Clear `.next` folder: `rm -rf .next`
5. Restart dev server

### Manifest 404
1. Check file: `app/.well-known/farcaster.json/route.ts`
2. Verify Vercel deployed successfully
3. Check Deployment Protection is OFF
4. Test URL directly in browser

### Images not showing
1. Verify files exist in `/public`
2. Check file names match config
3. Clear browser cache
4. Hard refresh (Cmd/Ctrl + Shift + R)

### Form not working
1. Check browser console
2. Verify Thirdweb SDK loaded
3. Check network in DevTools
4. Test in incognito mode

---

## 📱 Testing Checklist

Quick checks before launching:

- [ ] App loads on localhost
- [ ] Forms work correctly
- [ ] Tabs switch properly
- [ ] Images display
- [ ] No console errors
- [ ] Mobile responsive (375px)
- [ ] Manifest accessible
- [ ] Preview tool shows correct info
- [ ] Can open in Base app
- [ ] Full flow works end-to-end

---

## 🎯 Gas Estimates (Base)

Approximate costs:
- Token Deploy: ~0.0015 ETH (~$3-4)
- Token Approve: ~0.0002 ETH (~$0.50)
- Add Liquidity: ~0.002 ETH (~$4-5)

Total with pool: ~0.004 ETH (~$8-10)

*Prices vary with ETH price and network congestion*

---

## 💡 Quick Tips

### Performance
- Use `next/image` for images
- Lazy load components
- Minimize bundle size
- Cache API responses

### Security
- Never commit `.env.local`
- Use audited contracts only
- Validate all inputs
- Handle errors gracefully

### UX
- Show loading states
- Provide clear feedback
- Mobile-first design
- Keep it simple

### Marketing
- Share early and often
- Engage with community
- Respond to feedback
- Iterate quickly

---

## 🚀 Deployment Checklist

Essential steps:

1. ✅ Local testing complete
2. ✅ Images created
3. ✅ Push to GitHub
4. ✅ Deploy to Vercel
5. ✅ Set environment variables
6. ✅ Turn OFF Deployment Protection
7. ✅ Generate account association
8. ✅ Update manifest config
9. ✅ Test with preview tool
10. ✅ Launch! 🎉

---

## 📊 Key Metrics to Track

- Tokens created
- Daily active users
- Transaction volume
- Error rate
- User feedback score
- Retention rate

Check these:
- Vercel Analytics
- Browser console
- User feedback
- Community sentiment

---

## 🔗 Quick Actions

### Update Dependencies
```bash
npm update
npm audit fix
```

### Check Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run build && npm start
```

### Generate Types
```bash
npx tsc --noEmit
```

---

## 📞 Get Help

**Stuck?**

1. Check documentation
2. Search existing issues
3. Ask in Discord
4. Create GitHub issue
5. DM on Farcaster

**Community Links:**
- Discord: Base #mini-apps channel
- Farcaster: @base
- Twitter: @BuildOnBase

---

## 🎓 Learning Resources

### Tutorials
- [Base Mini Apps Guide](https://docs.base.org/mini-apps/quickstart/)
- [Farcaster SDK Docs](https://miniapps.farcaster.xyz/)
- [Next.js Tutorial](https://nextjs.org/learn)
- [Thirdweb Guides](https://portal.thirdweb.com/guides)

### Examples
- [Base Demo Apps](https://github.com/base/demos)
- [Mini App Templates](https://github.com/builders-garden/base-minikit-starter)

---

## 💾 Backup Reminders

Regular backups:
- Push to GitHub frequently
- Export Vercel env vars
- Save account association values
- Document custom changes

---

## 🎉 Success Indicators

You're on the right track when:
- ✅ App loads without errors
- ✅ Users can create tokens
- ✅ Feedback is positive
- ✅ No critical bugs
- ✅ Growing user base
- ✅ Community engagement

---

**Keep this document handy! Bookmark it! 📌**

Last updated: December 2024
