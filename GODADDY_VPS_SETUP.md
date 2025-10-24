# FixPoints - GoDaddy VPS Setup Guide

## 🚀 Complete Step-by-Step GoDaddy VPS Deployment

This guide will walk you through deploying your FixPoints car service finder to GoDaddy VPS hosting with your `fixpoints.cz` domain.

---

## Phase 1: Purchase and Setup GoDaddy VPS

### Step 1: Choose the Right Plan
1. **Go to GoDaddy.com** → Hosting → VPS Hosting
2. **Your FixPoints Configuration:**
   - ✅ **Virtual Private Server Linux 1 vCPU / 2GB RAM** (€19.35/month)
   - ✅ **Domain:** `fixpoints.cz` (€16.65/year)
   - ✅ **Perfect specifications** for your Next.js application

### Step 2: VPS Configuration
**Choose these settings:**
- **Operating System:** Ubuntu 22.04 LTS (recommended)
- **Control Panel:** None (we'll use command line)
- **Location:** Choose closest to your target users
- **Backup:** Enable automatic backups

### Step 3: Access Your VPS
After purchase, you'll receive:
- **IP Address:** (e.g., 123.456.789.012)
- **Username:** root
- **Password:** (provided via email)

---

## Phase 2: Initial Server Setup

### Step 4: Connect to Your VPS
```bash
# On Windows (use PowerShell or install PuTTY)
ssh root@YOUR_SERVER_IP

# Enter password when prompted
```

### Step 5: Update System
```bash
# Update package lists
apt update

# Upgrade all packages
apt upgrade -y

# Install essential tools
apt install -y curl wget git unzip software-properties-common
```

### Step 6: Create Non-Root User (Security)
```bash
# Create new user
adduser fixpoint

# Add to sudo group
usermod -aG sudo fixpoint

# Switch to new user
su - fixpoint
```

---

## Phase 3: Install Required Software

### Step 7: Install Node.js 18+
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher
```

### Step 8: Install PostgreSQL Database
```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql << EOF
CREATE USER fixpoint_user WITH PASSWORD 'YourStrongPassword123!';
CREATE DATABASE fixpoint_db OWNER fixpoint_user;
GRANT ALL PRIVILEGES ON DATABASE fixpoint_db TO fixpoint_user;
\q
EOF
```

### Step 9: Install Process Manager (PM2)
```bash
# Install PM2 globally
sudo npm install -g pm2

# Set PM2 to start on boot
pm2 startup
# Copy and run the command it shows
```

---

## Phase 4: Deploy Your FixPoint Application

### Step 10: Upload Your Code

**Option A: Using Git (Recommended)**
```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/fixpoint-car-service-finder.git

# Navigate to project
cd fixpoint-car-service-finder
```

**Option B: Upload via SCP/SFTP**
```bash
# From your local machine
scp -r "C:\Users\maxim.koblyuk\Desktop\My project" fixpoint@YOUR_SERVER_IP:~/fixpoint-car-service-finder
```

### Step 11: Install Dependencies
```bash
# Install project dependencies
npm install

# Install Prisma CLI globally (if needed)
sudo npm install -g prisma
```

### Step 12: Configure Environment Variables
```bash
# Create production environment file
nano .env.local
```

**Add the following content:**
```bash
# Database Connection
DATABASE_URL="postgresql://fixpoint_user:YourStrongPassword123!@localhost:5432/fixpoint_db"

# NextAuth Configuration
NEXTAUTH_URL="https://fixpoints.cz"
NEXTAUTH_SECRET="your-super-secret-random-string-here-make-it-long-and-complex"

# Google OAuth (Optional - get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Maps API (Optional)
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# Production Environment
NODE_ENV="production"
```

**Generate a strong NEXTAUTH_SECRET:**
```bash
# Generate random secret
openssl rand -base64 32
```

### Step 13: Set Up Database Schema
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Verify database connection
npx prisma db seed  # If you have seed data
```

### Step 14: Build Application
```bash
# Build Next.js application
npm run build

# Test the build
npm start
# Press Ctrl+C to stop after testing
```

---

## Phase 5: Configure Web Server (Nginx)

### Step 15: Install and Configure Nginx
```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/fixpoint
```

**Add this configuration:**
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

    # Increase client max body size for uploads
    client_max_body_size 50M;
}
```

### Step 16: Enable Nginx Site
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/fixpoint /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## Phase 6: Configure Domain and SSL

### Step 17: Point Domain to VPS
**In your GoDaddy domain management:**
1. Go to **DNS Management**
2. **Add/Edit A Record:**
   - **Type:** A
   - **Name:** @ (for root domain)
   - **Value:** YOUR_VPS_IP_ADDRESS
   - **TTL:** 600

3. **Add/Edit A Record for www:**
   - **Type:** A
   - **Name:** www
   - **Value:** YOUR_VPS_IP_ADDRESS
   - **TTL:** 600

**Wait 15-30 minutes for DNS propagation**

### Step 18: Install SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d fixpoints.cz -d www.fixpoints.cz

# Test automatic renewal
sudo certbot renew --dry-run
```

---

## Phase 7: Start Your Application

### Step 19: Start with PM2
```bash
# Start your application
pm2 start npm --name "fixpoint" -- start

# Save PM2 configuration
pm2 save

# Check status
pm2 status

# View logs
pm2 logs fixpoint
```

### Step 20: Configure Firewall
```bash
# Install and configure UFW firewall
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

---

## Phase 8: Final Testing and Monitoring

### Step 21: Test Your Deployment
1. **Visit your domain:** https://fixpoints.cz
2. **Test all features:**
   - Homepage loads with video background
   - Search functionality works
   - Language switching works
   - All pages accessible (/how-it-works, /reviews, /about)
   - Mobile responsiveness

### Step 22: Set Up Monitoring
```bash
# Install htop for system monitoring
sudo apt install -y htop

# Set up log rotation for PM2
pm2 install pm2-logrotate

# Configure PM2 monitoring
pm2 monitor
```

---

## 🔧 Maintenance Commands

### Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update your application
cd ~/fixpoint-car-service-finder
git pull origin main
npm install
npm run build
pm2 restart fixpoint
```

### Monitoring Commands
```bash
# Check PM2 status
pm2 status

# View application logs
pm2 logs fixpoint

# Check system resources
htop

# Check Nginx status
sudo systemctl status nginx

# Check database status
sudo systemctl status postgresql
```

### Backup Commands
```bash
# Backup database
pg_dump -U fixpoint_user fixpoint_db > backup_$(date +%Y%m%d).sql

# Backup application files
tar -czf fixpoint_backup_$(date +%Y%m%d).tar.gz ~/fixpoint-car-service-finder
```

---

## 🚨 Troubleshooting

### Common Issues and Solutions

**Application won't start:**
```bash
# Check logs
pm2 logs fixpoint

# Restart application
pm2 restart fixpoint

# Check if port 3000 is in use
sudo netstat -tulpn | grep :3000
```

**Database connection issues:**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test database connection
psql -U fixpoint_user -d fixpoint_db -h localhost
```

**Domain not working:**
```bash
# Check DNS propagation
nslookup fixpoints.cz

# Check Nginx configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

**SSL certificate issues:**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew
```

---

## 📊 Performance Optimization

### After deployment, consider these optimizations:

1. **Enable Nginx caching**
2. **Set up CDN (Cloudflare)**
3. **Optimize database queries**
4. **Compress static assets**
5. **Monitor with tools like New Relic or DataDog**

---

## 🎉 Congratulations!

Your FixPoint car service finder is now live on GoDaddy VPS! 

**Your application is accessible at:** https://your-domain.com

**Next steps:**
1. Test thoroughly on mobile and desktop
2. Set up Google Analytics
3. Configure error monitoring (Sentry)
4. Plan regular backups
5. Monitor performance and scale as needed

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review PM2 and Nginx logs
3. Verify all environment variables are correct
4. Ensure database is running and accessible
5. Contact GoDaddy support for VPS-specific issues

**Remember:** Always test changes on a staging environment before applying to production!