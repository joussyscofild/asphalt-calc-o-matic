
# Deployment Guide

This document outlines how to set up automatic deployment for your website and integrate WordPress for blog management.

## Initial Setup

Before setting up automatic deployment, ensure your server environment is correctly configured:

1. If using Git-based deployment:
   ```bash
   # Navigate to your application directory
   cd /home/asphaltcalculator.co/public_html/asphalt-calc-o-matic
   
   # Initialize a Git repository if not already done
   git init
   
   # Add your GitHub repository as a remote
   git remote add origin YOUR_GITHUB_REPO_URL
   
   # You may need to set up SSH keys for authentication
   # See: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
   ```

2. If not using Git, consider alternative file transfer methods like SFTP, rsync, or SCP.

## Manual Deployment

### Git-based Deployment
1. Connect to your server via SSH
2. Navigate to your project directory: `cd /home/asphaltcalculator.co/public_html/asphalt-calc-o-matic`
3. Pull the latest code: `git pull origin main`
4. Install dependencies: `npm install`
5. Build the project: `npm run build`

### Alternative Deployment (Non-Git)
1. Upload your files to the server using SFTP, SCP, or rsync
2. Connect to your server via SSH
3. Navigate to your project directory
4. Install dependencies and build the project

## WordPress Integration Setup

### 1. Create a Subdomain for WordPress

1. Log in to your hosting control panel (CyberPanel, cPanel, etc.)
2. Create a new subdomain: `blog.asphaltcalculator.co`
3. Point it to a separate directory: `/home/asphaltcalculator.co/public_html/wordpress`

### 2. Install WordPress on the Subdomain

1. Download WordPress from wordpress.org
2. Upload the files to your WordPress directory:
   ```bash
   cd /home/asphaltcalculator.co/public_html
   wget https://wordpress.org/latest.tar.gz
   tar -xzvf latest.tar.gz -C wordpress
   ```
3. Create a MySQL database for WordPress
4. Navigate to `http://blog.asphaltcalculator.co` in your browser
5. Follow the WordPress setup wizard
6. Configure WordPress settings:
   - Site Title: "Asphalt Calculator Blog"
   - WordPress Address (URL): `http://blog.asphaltcalculator.co`
   - Site Address (URL): `http://blog.asphaltcalculator.co`

### 3. Configure Apache for Reverse Proxy

The deploy.sh script automatically creates an .htaccess file with the necessary reverse proxy configuration. Make sure Apache has the following modules enabled:

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### 4. Verify Proxy Configuration in Your Virtual Host

Add these lines to your virtual host configuration in Apache (if not using .htaccess):

```apache
<VirtualHost *:80>
    ServerName asphaltcalculator.co
    ServerAlias www.asphaltcalculator.co
    
    DocumentRoot /home/asphaltcalculator.co/public_html/asphalt-calc-o-matic/dist
    
    ProxyRequests Off
    ProxyPreserveHost On
    
    ProxyPass /blog http://blog.asphaltcalculator.co
    ProxyPassReverse /blog http://blog.asphaltcalculator.co
    
    # Other directives...
</VirtualHost>
```

### 5. WordPress Theme and SEO Optimization

1. Install the "Yoast SEO" plugin in WordPress for SEO optimization
2. Choose a responsive theme that matches your main site design
3. Consider these plugins for enhanced functionality:
   - Advanced Custom Fields
   - WP Rocket (caching)
   - Wordfence (security)
   - Contact Form 7 (if needed)
   - W3 Total Cache (performance)

### 6. Update WordPress Permalinks

1. Go to WordPress Admin → Settings → Permalinks
2. Select "Post name" (/%postname%/) for SEO-friendly URLs
3. Save changes

## Automatic Deployment

### 1. Set Up Deployment Script

The `deploy.sh` script in the root of this repository will handle the deployment process.

Make it executable:
```bash
chmod +x /home/asphaltcalculator.co/deploy.sh
```

### 2. Set Up Webhooks in CyberPanel

1. Log in to CyberPanel
2. Navigate to Websites > your_website > Settings
3. Look for "Webhooks" or similar functionality
4. Create a new webhook with:
   - URL path: `/deploy-webhook`
   - Command to execute: `/home/asphaltcalculator.co/deploy.sh`
   - Secret (optional): Generate a secure string

### 3. Set Up GitHub Webhook (For Git-based Deployment)

1. Go to your GitHub repository
2. Navigate to Settings > Webhooks
3. Add a new webhook:
   - Payload URL: `https://asphaltcalculator.co/deploy-webhook`
   - Content type: `application/json`
   - Secret: Same as in CyberPanel (if used)
   - Events: Select "Push" events
   - Active: Check this box

### 4. Testing the Webhook

1. Make a small change to your repository
2. Commit and push the change
3. Check that the webhook is triggered and the deployment script runs
4. Verify that your website is updated with the changes

### 5. Troubleshooting

- Check webhook logs in GitHub or CyberPanel
- Examine the deploy_log.txt file for errors
- Ensure the script has proper permissions
- Verify that Git has proper authentication set up on your server
- Check Apache error logs for any proxy-related issues:
  ```bash
  sudo tail -f /var/log/apache2/error.log
  ```

### Note About Security

- Never expose your webhook without proper authentication
- Consider IP restricting the webhook to only accept requests from GitHub's IP ranges
- Use HTTPS for all webhook communications
- Configure WordPress security plugins to prevent common attacks
