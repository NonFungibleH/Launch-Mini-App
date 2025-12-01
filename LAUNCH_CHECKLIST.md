# ✅ Launch Checklist

Use this checklist to track your progress from development to launch.

---

## 🔧 Pre-Development Setup

- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Code editor ready (VS Code, Cursor, etc.)
- [ ] GitHub account created
- [ ] Thirdweb account created
- [ ] Farcaster account active

---

## 📦 Initial Setup

- [ ] Clone/download project files
- [ ] Run `npm install`
- [ ] Get Thirdweb Client ID
- [ ] Create `.env.local` file
- [ ] Add Thirdweb Client ID to `.env.local`
- [ ] Run `npm run dev` successfully
- [ ] Visit localhost:3000 and verify app loads

---

## 🎨 Design Assets

### Icon (512x512px)
- [ ] Design app icon
- [ ] Use Base blue (#0052FF) theme
- [ ] Save as `public/icon.png`
- [ ] Test icon displays in app

### Splash Screen (1200x630px)
- [ ] Design splash screen
- [ ] Include "Launch" branding
- [ ] Save as `public/splash.png`
- [ ] Test splash displays on load

---

## 🧪 Local Testing

- [ ] Token name input works
- [ ] Token symbol input works (uppercase)
- [ ] Total supply input accepts numbers
- [ ] Form validation shows errors
- [ ] "Launch Token" button works
- [ ] Tab switching works (Create/History)
- [ ] Token appears in history after creation
- [ ] Copy address button works
- [ ] BaseScan link works
- [ ] UI looks good on mobile size (375px width)
- [ ] No console errors

---

## 📤 Git & GitHub

- [ ] Initialize git: `git init`
- [ ] Create `.gitignore` (already included)
- [ ] Create new GitHub repository
- [ ] Add remote: `git remote add origin <url>`
- [ ] First commit: `git add . && git commit -m "Initial commit"`
- [ ] Push to GitHub: `git push -u origin main`
- [ ] Verify files on GitHub

---

## 🚀 Vercel Deployment

### First Deploy
- [ ] Sign up/in to Vercel
- [ ] Import GitHub repository
- [ ] Configure build settings (Next.js auto-detected)
- [ ] Add environment variable: `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
- [ ] Add environment variable: `NEXT_PUBLIC_APP_URL` (use Vercel URL)
- [ ] Deploy
- [ ] Note your Vercel URL (e.g., `launch-mini-app.vercel.app`)

### Update Environment
- [ ] Update `NEXT_PUBLIC_APP_URL` with actual Vercel URL
- [ ] Redeploy (automatic from Settings)
- [ ] Verify deployment succeeded

### Deployment Protection
- [ ] Go to Settings → Deployment Protection
- [ ] Turn OFF "Vercel Authentication"
- [ ] Save settings
- [ ] Verify manifest accessible: `https://your-url.vercel.app/.well-known/farcaster.json`

---

## 🔐 Account Association

- [ ] Ensure app is deployed and accessible
- [ ] Go to [Base Build Tools](https://www.base.dev/preview?tab=account)
- [ ] Enter your domain (no https://)
- [ ] Click "Submit"
- [ ] Click "Verify"
- [ ] Sign with Farcaster (Warpcast app)
- [ ] Copy `header` value
- [ ] Copy `payload` value
- [ ] Copy `signature` value
- [ ] Update `minikit.config.ts` with values
- [ ] Commit changes
- [ ] Push to GitHub: `git add . && git commit -m "Add account association" && git push`
- [ ] Wait for Vercel auto-deploy

---

## 🧪 Preview Testing

- [ ] Go to [Base Preview Tool](https://www.base.dev/preview)
- [ ] Enter your app URL
- [ ] Check "Embed Preview" tab - looks good?
- [ ] Check "Account Association" - verified?
- [ ] Check "Metadata" - all fields filled?
- [ ] Click "Launch" button - app opens?
- [ ] Test full flow in preview:
  - [ ] Create token form loads
  - [ ] Can switch tabs
  - [ ] Can input data
  - [ ] Can submit form
  - [ ] Token appears in history

---

## 🎯 Production Testing

### In Farcaster/Warpcast
- [ ] Create test cast with your URL
- [ ] Embed appears correctly
- [ ] Icon shows
- [ ] Description shows
- [ ] "Open" button appears
- [ ] Click "Open" - app loads in Base app
- [ ] Test complete user flow
- [ ] Verify on different devices (iOS/Android)

### Final Checks
- [ ] No errors in browser console
- [ ] All images load
- [ ] Forms work correctly
- [ ] History persists
- [ ] Copy buttons work
- [ ] External links open correctly
- [ ] Loading states work

---

## 📢 Launch

### Pre-Launch
- [ ] All checklist items above complete
- [ ] App stable and working
- [ ] Documentation reviewed
- [ ] Support plan ready

### Launch Day
- [ ] Create announcement cast on Farcaster
- [ ] Share in Base Discord (#mini-apps)
- [ ] Tweet about launch
- [ ] Share in relevant communities
- [ ] Monitor for issues
- [ ] Respond to early users

### Post-Launch (First Week)
- [ ] Monitor Vercel analytics
- [ ] Check error logs daily
- [ ] Gather user feedback
- [ ] Fix critical bugs immediately
- [ ] Update documentation if needed
- [ ] Plan improvements based on feedback

---

## 🔄 Phase 2 Preparation (Future)

- [ ] Review Phase 2 plan
- [ ] Research Uniswap integration
- [ ] Test on Base testnet
- [ ] Design pool creation UI
- [ ] Implement pool creation logic
- [ ] Beta test with small amounts
- [ ] Launch Phase 2

---

## 📊 Success Metrics

### Week 1
- [ ] Tokens Created: ___ / 100
- [ ] Daily Active Users: ___ / 50
- [ ] Community Feedback: Positive/Neutral/Negative
- [ ] Issues Reported: ___
- [ ] Issues Resolved: ___

### Month 1
- [ ] Tokens Created: ___ / 500
- [ ] Daily Active Users: ___ / 200
- [ ] Featured in Base app: Yes/No
- [ ] App Rating: ___ / 5.0
- [ ] Total Value Created: $___

---

## 🐛 Common Issues & Solutions

### Issue: Manifest 404
- [ ] Check route file exists
- [ ] Verify Vercel deployment succeeded
- [ ] Test URL directly in browser

### Issue: App Won't Open
- [ ] Verify Deployment Protection is OFF
- [ ] Check account association is correct
- [ ] Try clearing cache

### Issue: Images Don't Load
- [ ] Verify images in `/public` folder
- [ ] Check image paths in config
- [ ] Try hard refresh

### Issue: Form Doesn't Work
- [ ] Check browser console for errors
- [ ] Verify Thirdweb Client ID is set
- [ ] Test in different browsers

---

## 📝 Notes

Use this section for your own notes during development:

**Date Started**: _______________

**Date Deployed**: _______________

**App URL**: _______________

**Issues Encountered**:
- 
- 
- 

**Improvements Planned**:
- 
- 
- 

**User Feedback**:
- 
- 
- 

---

## 🎉 Completion

When all items are checked:

**Congratulations! Your Launch mini app is live! 🚀**

Share your success:
- [ ] Post about launch on social media
- [ ] Add to portfolio
- [ ] Submit to Base app directories
- [ ] Share learnings with community

---

**Keep Building!** 💪

Remember:
- Iterate based on feedback
- Monitor for issues
- Plan Phase 2 features
- Engage with users
- Have fun! 🎉
