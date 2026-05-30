# Deployment Guide for Čo ty a Boh? — React + Vite

This guide covers multiple deployment options for your React + Vite website.

## Quick Start: Which Platform?

| Platform | Best For | Cost | Setup Time |
|----------|----------|------|-----------|
| **Vercel** | Fast, automatic deployments | Free tier available | 2 min |
| **Netlify** | Easy, great UX | Free tier available | 2 min |
| **GitHub Pages** | Free, if you use GitHub | Free | 5 min |
| **Traditional Hosting** | Full control, VPS/Shared | Varies | 10 min |

---

## 1. Vercel Deployment (Recommended)

**Cost**: Free tier includes unlimited deployments  
**Time**: ~2 minutes

### Steps:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Choose project name
   - Press Enter for defaults
   - Deployment done! You'll get a URL like `https://coty-boh.vercel.app`

### Auto-Deploy from Git:

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Click "Deploy"
5. Every push to main branch auto-deploys

---

## 2. Netlify Deployment

**Cost**: Free tier includes 300 minutes build time/month  
**Time**: ~2 minutes

### Steps:

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Auto-Deploy from Git:

1. Push code to GitHub
2. Go to [netlify.com/team](https://app.netlify.com/)
3. Click "New site from Git"
4. Choose GitHub, select repository
5. Build settings auto-detected, click "Deploy site"

---

## 3. GitHub Pages Deployment

**Cost**: Free  
**Time**: ~5 minutes  
**Requirements**: GitHub account + GitHub repository

### Steps:

1. **Update `vite.config.js`**:
   ```javascript
   export default {
     base: '/coty-boh/', // Change to your repo name
     // ... rest of config
   }
   ```

2. **Update `package.json`** (add deploy script):
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)
   - Save

Your site will be at `https://yourusername.github.io/coty-boh/`

---

## 4. Traditional Hosting (Shared/VPS/Dedicated)

**Time**: ~10 minutes

### Steps:

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to your hosting via:
   - FTP/SFTP
   - Control Panel file manager
   - Git (if your host supports it)
   - SSH SCP

3. **Set root directory** to the `dist` folder in your hosting control panel

4. **SSL Certificate** (HTTPS): Usually auto-included with modern hosting

### Example (SCP):
```bash
npm run build
scp -r dist/* user@yourhost.com:/home/username/public_html/
```

---

## 5. Docker Deployment

For advanced users wanting containerized deployment:

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Build and run:
```bash
docker build -t coty-boh .
docker run -p 3000:3000 coty-boh
```

---

## Environment Variables

If you need environment variables (e.g., API endpoints):

1. **Create `.env` file**:
   ```
   VITE_API_URL=https://api.example.com
   VITE_GA_ID=UA-XXXXXXXXX-X
   ```

2. **Access in code**:
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

3. **In deployment platform**, add same variables in settings

---

## Post-Deployment Checklist

- [ ] Visit your deployed site
- [ ] Test navigation and scroll animations
- [ ] Test shopping cart functionality
- [ ] Test image upload (image-slot component)
- [ ] Check mobile responsiveness
- [ ] Verify font loading (should see custom fonts)
- [ ] Test social links (Instagram)
- [ ] Check performance (Lighthouse via DevTools)

---

## Troubleshooting

### Images not loading
- Ensure image-slot.js is in public folder
- Check browser console for CORS errors

### Fonts not displaying
- Verify Google Fonts links in `index.html`
- Check font-family CSS classes

### Styles missing
- Ensure Tailwind CSS is built (check dist/assets/index-*.css)
- Clear cache (Ctrl+Shift+R or Cmd+Shift+R)

### Cart not persisting
- Current implementation uses component state (not localStorage)
- To persist: Add localStorage in App.jsx useEffect

---

## Performance Optimization

Already included:
- ✅ Code splitting (automatic with Vite)
- ✅ CSS minification (production build)
- ✅ Image slot lazy loading
- ✅ Smooth animations (GPU-accelerated transforms)

Optional additions:
- Add `<link rel="preconnect">` in index.html for external APIs
- Implement image optimization (next/image alternative)
- Add service worker for offline support

---

## Getting Help

- **Vercel Issues**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Issues**: [netlify.com/docs](https://docs.netlify.com)
- **GitHub Pages**: [pages.github.com](https://pages.github.com)
- **React/Vite**: Check README.md

---

**Happy Deploying! 🚀**
