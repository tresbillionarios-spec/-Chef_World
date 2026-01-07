# Netlify Setup Guide ✅

## ✅ Files Created

### 1. `netlify.toml` (Project Root)
- Location: `/netlify.toml` (same level as `package.json`)
- Contains:
  - Redirect rules for Angular SPA routing
  - Build command configuration
  - Publish directory configuration

### 2. `src/_redirects` (Backup)
- Location: `/src/_redirects`
- Content: `/*    /index.html   200`
- Angular will copy this to `dist/catering-static-site/_redirects` during build

## 📋 Netlify Build Settings

### Required Settings in Netlify Dashboard:

**Site settings → Build & deploy → Build settings**

| Setting | Value |
|---------|-------|
| **Build command** | `ng build --configuration=production` |
| **Publish directory** | `dist/catering-static-site` |

⚠️ **Important**: The publish directory must match the `outputPath` in `angular.json`:
- Current outputPath: `dist/catering-static-site`
- Netlify publish: `dist/catering-static-site`

## 🔍 Verification Steps

### 1. Check Build Output
After running `ng build --configuration=production`, verify:
```
dist/
 └── catering-static-site/
     ├── index.html
     ├── main.js
     ├── styles.css
     └── assets/
```

### 2. Test After Deploy
✅ Open site root `/` → should load  
✅ Refresh the page → should still load  
✅ Open any Angular route directly (e.g., `/gallery`, `/booking`) → should load  
✅ All routes work on refresh → ✅ Fixed!

## 📝 What Was Fixed

1. ✅ Created `netlify.toml` with redirect rules
2. ✅ Added `_redirects` file as backup
3. ✅ Updated `angular.json` to include `_redirects` in assets
4. ✅ Configured build settings in `netlify.toml`
5. ✅ Committed and pushed to GitHub

## 🚀 Next Steps

1. **Netlify will auto-redeploy** after the push
2. **Verify build** in Netlify dashboard
3. **Test routes** after deployment
4. **All Angular routes should work** including refresh and deep links

## ✅ Expected Result

- ✅ No more 404 errors on route refresh
- ✅ Deep links work correctly
- ✅ All Angular routes accessible
- ✅ SPA routing fully functional on Netlify

