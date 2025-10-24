# FixPoint Car Service Finder - Deployment Guide

This guide will walk you through deploying your FixPoint application to the internet step by step.

## 📋 Prerequisites

Before you begin, make sure you have:
- [Git](https://git-scm.com/) installed on your computer
- A [GitHub](https://github.com/) account
- Basic understanding of terminal/command line

## 🚀 Deployment Options

We'll cover multiple deployment platforms:

### **Recommended Options (Easy Setup)**
1. **Vercel** (Recommended for Next.js) - Free tier available
2. **Netlify** - Free tier available  
3. **Railway** - Great for full-stack apps with database

### **Traditional Hosting Options**
4. **GoDaddy Hosting** - Shared/VPS hosting
5. **HostGator** - Shared/Cloud hosting
6. **Bluehost** - WordPress/Web hosting
7. **DigitalOcean** - VPS/Droplets
8. **AWS** - Enterprise-level hosting
9. **Google Cloud Platform** - Enterprise hosting

## 📊 Platform Comparison

| Platform | Difficulty | Cost | Setup Time | Best For |
|----------|------------|------|------------|----------|
| **Vercel** | ⭐ Easy | Free - $20/month | 5 minutes | Next.js apps, beginners |
| **Netlify** | ⭐ Easy | Free - $19/month | 10 minutes | Static sites, JAMstack |
| **Railway** | ⭐⭐ Medium | $5 - $20/month | 15 minutes | Full-stack apps |
| **GoDaddy VPS** | ⭐⭐⭐ Hard | $5 - $30/month | 2-4 hours | Custom control, existing GoDaddy users |
| **DigitalOcean** | ⭐⭐⭐ Hard | $6 - $50/month | 1-3 hours | Developers, scalability |
| **AWS** | ⭐⭐⭐⭐ Expert | $10 - $100+/month | 4-8 hours | Enterprise, high traffic |

### 🎯 **Recommendations**

**👶 If you're a beginner:** Start with **Vercel** - it's specifically designed for Next.js and handles everything automatically.

**💰 If you want the cheapest option:** **Railway** or **Vercel free tier** are great starting points.

**🏠 If you already use GoDaddy:** Their VPS hosting works well, but requires more technical setup.

**🚀 If you want to scale later:** **Vercel** or **DigitalOcean** offer the best scaling options.

**🔧 If you want full control:** **DigitalOcean** or **AWS** give you complete server control.

---

## Option 1: Deploy to Vercel (Recommended)

Vercel is created by the makers of Next.js and offers the best Next.js deployment experience.

### Step 1: Prepare Your Project

1. **Create a `.env.local` file** in your project root:
```bash
# Copy from .env.example and fill in your values
cp .env.example .env.local
```

2. **Add your environment variables to `.env.local`**:
```bash
# Database (we'll set this up later)
DATABASE_URL="your-database-url-here"

# NextAuth.js
NEXTAUTH_URL="https://your-app-name.vercel.app"
NEXTAUTH_SECRET="your-super-secret-random-string"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Maps API
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

3. **Test your build locally**:
```bash
npm run build
```
If there are any errors, fix them before proceeding.

### Step 2: Set Up Database (PostgreSQL)

#### Option A: Vercel Postgres (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database" → "Postgres"
3. Choose your database name: `fixpoint-db`
4. Copy the connection string provided

#### Option B: Supabase (Free alternative)
1. Go to [Supabase](https://supabase.com/)
2. Create new project: `fixpoint-database`
3. Go to Settings → Database
4. Copy the connection string (URI format)

#### Option C: Railway
1. Go to [Railway](https://railway.app/)
2. Create new project → Add PostgreSQL
3. Copy the connection string from Variables tab

### Step 3: Push to GitHub

1. **Initialize Git repository**:
```bash
git init
git add .
git commit -m "Initial commit: FixPoint car service finder"
```

2. **Create GitHub repository**:
   - Go to [GitHub](https://github.com/) → New Repository
   - Name it: `fixpoint-car-service-finder`
   - Keep it public or private (your choice)
   - Don't initialize with README (you already have one)

3. **Connect and push**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/fixpoint-car-service-finder.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

1. **Go to Vercel**:
   - Visit [Vercel](https://vercel.com/)
   - Sign up/Login with your GitHub account

2. **Import your project**:
   - Click "New Project"
   - Import your `fixpoint-car-service-finder` repository
   - Keep all default settings (Vercel auto-detects Next.js)

3. **Add environment variables**:
   - In project settings → Environment Variables
   - Add all variables from your `.env.local`:
     ```
     DATABASE_URL = your-database-connection-string
     NEXTAUTH_URL = https://your-app-name.vercel.app
     NEXTAUTH_SECRET = your-secret-key
     GOOGLE_CLIENT_ID = your-google-client-id (if using)
     GOOGLE_CLIENT_SECRET = your-google-client-secret (if using)
     GOOGLE_MAPS_API_KEY = your-google-maps-api-key (if using)
     ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-app-name.vercel.app`

### Step 5: Set Up Database Schema

1. **Run database migrations**:
   - In Vercel Dashboard → Functions → Terminal, or use local terminal:
```bash
# Make sure DATABASE_URL is set to production database
npx prisma generate
npx prisma db push
```

2. **Optional: Seed with sample data**:
```bash
npx prisma db seed # if you create a seed script
```

---

## Option 2: Deploy to Netlify

### Step 1: Prepare for Static Export (if needed)

Since Netlify primarily serves static sites, you might need to modify your Next.js config:

1. **Update `next.config.js`**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

2. **Build and test**:
```bash
npm run build
```

### Step 2: Deploy to Netlify

1. **Go to Netlify**:
   - Visit [Netlify](https://www.netlify.com/)
   - Sign up with GitHub

2. **Deploy from Git**:
   - Click "New site from Git"
   - Choose GitHub → Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `out` (if using static export) or `dist`

3. **Add environment variables**:
   - Site settings → Environment variables
   - Add your production environment variables

---

## Option 3: Deploy to Railway (Full-Stack with Database)

### Step 1: Deploy to Railway

1. **Go to Railway**:
   - Visit [Railway](https://railway.app/)
   - Sign up with GitHub

2. **Create new project**:
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository

3. **Add PostgreSQL service**:
   - In project dashboard → Add service → Database → PostgreSQL
   - Railway will provide connection string automatically

4. **Configure environment variables**:
   - In your Next.js service settings → Variables
   - Add all required environment variables
   - Use Railway's provided `DATABASE_URL`

---

## Option 4: Deploy to GoDaddy Hosting

GoDaddy offers various hosting options. For Next.js apps, you'll need VPS or dedicated hosting since shared hosting typically only supports static files.

### Step 1: Choose the Right GoDaddy Plan

**For Next.js Applications, you need:**
- **VPS Hosting** ($4.99/month+) - Recommended
- **Dedicated Server** ($89.99/month+) - For high traffic
- ⚠️ **Shared Hosting** - Won't work for Next.js apps

### Step 2: Set Up Your GoDaddy VPS

1. **Purchase VPS hosting** from GoDaddy
2. **Access your server** via SSH:
```bash
ssh root@your-server-ip
```

3. **Install Node.js and npm**:
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18+ (required for Next.js)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

4. **Install PM2** (Process Manager):
```bash
npm install -g pm2
```

5. **Install PostgreSQL** (for database):
```bash
apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Step 3: Deploy Your Application

1. **Upload your code** (via Git or FTP):
```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/fixpoint-car-service-finder.git
cd fixpoint-car-service-finder
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
# Create .env.local file
nano .env.local
```
Add your production environment variables:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/fixpoint_db"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-super-secret-key"
# ... other variables
```

4. **Set up database**:
```bash
# Create database user and database
sudo -u postgres psql
CREATE USER fixpoint_user WITH PASSWORD 'your_password';
CREATE DATABASE fixpoint_db OWNER fixpoint_user;
\q

# Run Prisma migrations
npx prisma generate
npx prisma db push
```

5. **Build your application**:
```bash
npm run build
```

6. **Start with PM2**:
```bash
pm2 start npm --name "fixpoint" -- start
pm2 save
pm2 startup
```

### Step 4: Configure Domain and SSL

1. **Point your domain** to your VPS IP in GoDaddy DNS settings
2. **Install Nginx** as reverse proxy:
```bash
apt install nginx -y
```

3. **Configure Nginx** (`/etc/nginx/sites-available/fixpoint`):
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Enable site and restart Nginx**:
```bash
ln -s /etc/nginx/sites-available/fixpoint /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

5. **Install SSL certificate**:
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## Option 5: Deploy to Other Traditional Hosting

### HostGator VPS/Cloud Hosting

**Similar process to GoDaddy:**
1. Purchase VPS or Cloud hosting plan
2. Follow the same Node.js installation steps
3. Upload and configure your application
4. Set up domain and SSL

### Bluehost VPS

**Process:**
1. Get VPS hosting (shared hosting won't work for Next.js)
2. Use cPanel or SSH access
3. Install Node.js via cPanel Node.js app or SSH
4. Follow similar deployment steps

### DigitalOcean Droplet

**More developer-friendly option:**
1. **Create a Droplet** ($6/month for basic)
2. **Choose Ubuntu 22.04** as OS
3. **Follow GoDaddy VPS steps** above
4. **Use DigitalOcean's firewall** for security

### AWS (Advanced)

**For enterprise-level deployment:**
1. **Use AWS Amplify** for easy Next.js deployment
2. **Or use EC2 + RDS** for custom setup
3. **Configure CloudFront** for CDN
4. **Use Route 53** for DNS management

---

## 🔧 Post-Deployment Setup

### 1. Custom Domain (Optional)

#### For Vercel:
1. Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

#### For Netlify:
1. Site Settings → Domain management
2. Add custom domain
3. Update DNS records

### 2. Set Up Google OAuth (Optional)

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create new project**: "FixPoint OAuth"
3. **Enable Google+ API**
4. **Create OAuth credentials**:
   - Application type: Web application
   - Authorized redirect URIs: `https://your-domain.com/api/auth/callback/google`
5. **Copy Client ID and Secret to your environment variables**

### 3. Set Up Google Maps API (Optional)

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Enable Maps JavaScript API**
3. **Create API key**
4. **Restrict API key** (recommended):
   - HTTP referrers: `https://your-domain.com/*`
5. **Add API key to environment variables**

### 4. Configure Apple Sign-In (Optional)

1. **Apple Developer Account required** ($99/year)
2. **Create App ID** in Apple Developer portal
3. **Configure Sign in with Apple**
4. **Add credentials to environment variables**

---

## 🔍 Testing Your Deployment

### 1. Functional Testing
- [ ] Homepage loads correctly
- [ ] Search functionality works
- [ ] Service categories display properly
- [ ] Language switching (Czech/English) works
- [ ] All pages accessible:
  - [ ] How it works (`/how-it-works`)
  - [ ] Reviews (`/reviews`)
  - [ ] About us (`/about`)
- [ ] Responsive design on mobile
- [ ] Authentication flows (if implemented)

### 2. Performance Testing
- Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Test loading times
- Check Core Web Vitals

### 3. SEO Testing
- Use [Google Search Console](https://search.google.com/search-console)
- Submit sitemap
- Check meta tags and descriptions

---

## 🐛 Common Issues and Solutions

### Build Errors

**Error: "Module not found"**
```bash
# Install missing dependencies
npm install
```

**Error: "Environment variable not found"**
- Check all required environment variables are set in deployment platform
- Ensure variable names match exactly (case-sensitive)

### Database Issues

**Error: "Can't connect to database"**
- Verify DATABASE_URL is correct in production
- Check database is running and accessible
- Ensure database schema is migrated: `npx prisma db push`

### Authentication Issues

**Error: "NextAuth configuration error"**
- Ensure NEXTAUTH_SECRET is set and unique
- Verify NEXTAUTH_URL matches your production domain
- Check OAuth provider settings (redirect URIs)

---

## 📈 Monitoring and Analytics

### 1. Set Up Analytics
- **Google Analytics**: Add tracking code to `layout.tsx`
- **Vercel Analytics**: Enable in Vercel dashboard
- **Hotjar/LogRocket**: For user behavior tracking

### 2. Error Monitoring
- **Sentry**: For error tracking and performance monitoring
- **Vercel Monitoring**: Built-in monitoring for Vercel deployments

### 3. Uptime Monitoring
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Professional monitoring service

---

## 🔄 Continuous Deployment

Once set up, your deployment will automatically update when you push to GitHub:

1. **Make changes locally**
2. **Test changes**: `npm run dev`
3. **Commit and push**:
```bash
git add .
git commit -m "Update: describe your changes"
git push origin main
```
4. **Automatic deployment** starts on your platform
5. **Verify deployment** at your live URL

---

## 🎯 Final Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Database connected and migrated
- [ ] Build completes without errors
- [ ] All pages load correctly
- [ ] Mobile responsiveness tested
- [ ] Authentication works (if implemented)
- [ ] Google Maps integration (if implemented)
- [ ] Analytics tracking set up
- [ ] Custom domain configured (if desired)
- [ ] SSL certificate active (usually automatic)
- [ ] Error monitoring configured

---

## 📞 Support Resources

### Documentation
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

### Communities
- [Next.js Discord](https://discord.com/invite/bUG2bvbtHy)
- [Vercel Discord](https://discord.com/invite/vercel)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

**Congratulations! Your FixPoint car service finder is now live on the internet! 🎉**

Share your URL with friends and start getting feedback from real users. Remember to monitor your application and gather user feedback to continue improving the service.