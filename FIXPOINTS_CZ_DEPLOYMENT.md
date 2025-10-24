# FixPoints.cz - Quick Deployment Checklist

## 🎯 Your Specific Setup
- **Domain:** `fixpoints.cz` (€16.65/year)
- **VPS:** Linux 1 vCPU / 2GB RAM (€19.35/month)
- **Application:** FixPoints Car Service Finder

---

## ✅ Pre-Deployment Checklist

### 1. After GoDaddy Purchase
- [ ] Receive VPS IP address via email
- [ ] Receive root login credentials
- [ ] Access to GoDaddy domain management

### 2. Prepare Your Code
- [ ] Ensure code is pushed to GitHub: `https://github.com/YOUR_USERNAME/fixpoints-car-service-finder`
- [ ] Video file ready: Place `watermarked_preview.mp4` in `public/` folder
- [ ] Environment variables prepared (see below)

---

## 🚀 Deployment Steps (2-3 hours)

### Phase 1: Connect to Server (15 min)
```bash
# Connect via SSH
ssh root@YOUR_VPS_IP_ADDRESS
# Enter password from GoDaddy email
```

### Phase 2: Install Software (45 min)
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install PM2 and Nginx
npm install -g pm2
apt install -y nginx
```

### Phase 3: Deploy FixPoints (30 min)
```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/fixpoints-car-service-finder.git
cd fixpoints-car-service-finder

# Install dependencies
npm install

# Create environment file
nano .env.local
```

**Add this exact configuration:**
```bash
# Database
DATABASE_URL="postgresql://fixpoints_user:YourStrongPassword123!@localhost:5432/fixpoints_db"

# NextAuth
NEXTAUTH_URL="https://fixpoints.cz"
NEXTAUTH_SECRET="your-generated-secret-key-here"

# Optional: Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional: Google Maps
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# Environment
NODE_ENV="production"
```

### Phase 4: Database Setup (15 min)
```bash
# Create database user and database
sudo -u postgres psql << EOF
CREATE USER fixpoints_user WITH PASSWORD 'YourStrongPassword123!';
CREATE DATABASE fixpoints_db OWNER fixpoints_user;
GRANT ALL PRIVILEGES ON DATABASE fixpoints_db TO fixpoints_user;
\q
EOF

# Set up database schema
npx prisma generate
npx prisma db push
```

### Phase 5: Build and Start (15 min)
```bash
# Build application
npm run build

# Start with PM2
pm2 start npm --name "fixpoints" -- start
pm2 save
pm2 startup
```

### Phase 6: Configure Nginx (30 min)
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/fixpoints
```

**Add this exact configuration:**
```nginx
server {
    listen 80;
    server_name fixpoints.cz www.fixpoints.cz;

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
        
        # Handle video files
        location ~* \.(mp4|webm|ogg)$ {
            proxy_pass http://localhost:3000;
            add_header Cache-Control "public, max-age=31536000";
        }
    }

    client_max_body_size 50M;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/fixpoints /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### Phase 7: Domain Configuration (20 min)
**In GoDaddy DNS Management:**
1. **Add A Record:**
   - **Type:** A
   - **Name:** @
   - **Value:** YOUR_VPS_IP_ADDRESS
   - **TTL:** 600

2. **Add A Record for www:**
   - **Type:** A  
   - **Name:** www
   - **Value:** YOUR_VPS_IP_ADDRESS
   - **TTL:** 600

**Wait 15-30 minutes for DNS propagation**

### Phase 8: SSL Certificate (10 min)
```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate for fixpoints.cz
sudo certbot --nginx -d fixpoints.cz -d www.fixpoints.cz
```

---

## 🎉 Final Testing

### Test Your FixPoints Website:
1. **Visit:** https://fixpoints.cz
2. **Check features:**
   - [ ] Homepage loads with video background
   - [ ] Search bar works
   - [ ] Language switching (Czech/English)
   - [ ] Service categories display
   - [ ] All pages work: `/how-it-works`, `/reviews`, `/about`
   - [ ] Mobile responsive design
   - [ ] SSL certificate (green lock icon)

---

## 🔧 Maintenance Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs fixpoints

# Restart application
pm2 restart fixpoints

# Update application
cd ~/fixpoints-car-service-finder
git pull origin main
npm install
npm run build
pm2 restart fixpoints
```

---

## 📞 Emergency Contacts

### If You Need Help:
1. **Server Issues:** GoDaddy VPS Support
2. **Domain Issues:** GoDaddy Domain Support  
3. **Application Issues:** Check PM2 logs: `pm2 logs fixpoints`

### Quick Diagnostics:
```bash
# Check if application is running
curl http://localhost:3000

# Check Nginx status
sudo systemctl status nginx

# Check database connection
psql -U fixpoints_user -d fixpoints_db -h localhost
```

---

## 🎯 Success Metrics

**Your FixPoints.cz will be live when:**
- ✅ https://fixpoints.cz loads successfully
- ✅ Video background plays automatically
- ✅ Search functionality works
- ✅ Language switching works
- ✅ All pages are accessible
- ✅ Mobile version works perfectly
- ✅ SSL certificate is active

**Estimated total time:** 2-3 hours from start to finish

**Monthly cost:** ~€20.74 (€19.35 VPS + ~€1.39 domain)