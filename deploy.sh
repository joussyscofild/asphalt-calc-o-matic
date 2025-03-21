
#!/bin/bash

# Set the project directory
PROJECT_DIR="/home/asphaltcalculator.co/public_html/asphalt-calc-o-matic"
DEPLOY_LOG="/home/asphaltcalculator.co/deploy_log.txt"

# Navigate to your project directory
cd $PROJECT_DIR || { echo "Failed to navigate to project directory"; exit 1; }

# Log start of deployment
echo "Starting deployment at $(date)" >> $DEPLOY_LOG

# Check if this is a git repository
if [ -d ".git" ]; then
  echo "Git repository detected, pulling latest changes..." >> $DEPLOY_LOG
  git pull origin main || { echo "Git pull failed" >> $DEPLOY_LOG; exit 1; }
else
  echo "Not a git repository. Skipping git pull." >> $DEPLOY_LOG
fi

# Check if package.json exists before trying to run npm commands
if [ -f "package.json" ]; then
  echo "Installing dependencies..." >> $DEPLOY_LOG
  npm install || { echo "npm install failed" >> $DEPLOY_LOG; exit 1; }
  
  echo "Building the project..." >> $DEPLOY_LOG
  npm run build || { echo "Build failed" >> $DEPLOY_LOG; exit 1; }
  
  # Create or update .htaccess file in the dist directory
  echo "Setting up server configuration for proper routing..." >> $DEPLOY_LOG
  
  cat > dist/.htaccess << 'EOF'
# Handle XML files with proper MIME type
AddType application/xml .xml

# Enable rewrite engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  
  # Redirect /blog requests to the subdomain - Make sure this is handled first
  # Adding NC flag for case-insensitive matching
  RewriteRule ^blog(.*)$ https://blog.asphaltcalculator.co$1 [R=301,NC,L]
  
  # Rewrite everything else to index.html to allow SPA routing
  RewriteRule ^ index.html [L]
</IfModule>
EOF
  
  echo "Server configuration created." >> $DEPLOY_LOG
else
  echo "No package.json found. Skipping npm steps." >> $DEPLOY_LOG
fi

# Log deployment completion
echo "Deployment completed at $(date)" >> $DEPLOY_LOG

# Report success
echo "Deployment process completed successfully!"
