
# Deployment Guide

This document outlines how to set up automatic deployment for your website.

## Initial Setup

Before setting up automatic deployment, ensure your server environment is correctly configured:

1. If using Git-based deployment:
   ```bash
   # Navigate to your public_html directory
   cd /home/asphaltcalculator.co/public_html
   
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
2. Navigate to your project directory: `cd /home/asphaltcalculator.co/public_html/`
3. Pull the latest code: `git pull origin main`
4. Install dependencies: `npm install`
5. Build the project: `npm run build`

### Alternative Deployment (Non-Git)
1. Upload your files to the server using SFTP, SCP, or rsync
2. Connect to your server via SSH
3. Navigate to your project directory
4. Install dependencies and build the project

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
- If using Git, check if the repository is properly initialized and configured

### Note About Security

- Never expose your webhook without proper authentication
- Consider IP restricting the webhook to only accept requests from GitHub's IP ranges
- Use HTTPS for all webhook communications
