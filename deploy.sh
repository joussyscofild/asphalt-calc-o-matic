
#!/bin/bash

# Set the project directory
PROJECT_DIR="/home/asphaltcalculator.co/public_html/asphalt-calc-o-matic"

# Navigate to your project directory
cd $PROJECT_DIR || { echo "Failed to navigate to project directory"; exit 1; }

# Log start of deployment
echo "Starting deployment at $(date)" >> /home/asphaltcalculator.co/deploy_log.txt

# Check if this is a git repository
if [ -d ".git" ]; then
  echo "Git repository detected, pulling latest changes..."
  git pull origin main || { echo "Git pull failed"; exit 1; }
else
  echo "Not a git repository. Skipping git pull."
  # You may want to implement an alternative method to update files here
  # For example, using rsync, scp, or a custom file transfer method
fi

# Check if package.json exists before trying to run npm commands
if [ -f "package.json" ]; then
  echo "Installing dependencies..."
  npm install || { echo "npm install failed"; exit 1; }
  
  echo "Building the project..."
  npm run build || { echo "Build failed"; exit 1; }
  
  # Create a server config to properly handle SPA routing and reverse proxy for WordPress
  echo "Setting up server configuration for proper routing and WordPress integration..."
  
  # Create or update .htaccess file in the dist directory
  cat > dist/.htaccess << 'EOF'
# Handle XML files with proper MIME type
AddType application/xml .xml

# Enable rewrite engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Reverse proxy for /blog to WordPress subdomain
  RewriteCond %{REQUEST_URI} ^/blog
  RewriteRule ^blog(.*)$ http://blog.asphaltcalculator.co$1 [P,L]
  
  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  
  # Rewrite everything else to index.html to allow SPA routing
  RewriteRule ^ index.html [L]
</IfModule>

# Configure proxy settings for WordPress
<IfModule mod_proxy.c>
  ProxyRequests Off
  ProxyPreserveHost On
  
  <Proxy *>
    Require all granted
  </Proxy>
  
  # Enable needed proxy modules
  <IfModule !mod_proxy_http.c>
    LoadModule proxy_http_module modules/mod_proxy_http.so
  </IfModule>
</IfModule>
EOF
  
  echo "Server configuration created."
else
  echo "No package.json found. Skipping npm steps."
fi

# Log deployment completion
echo "Deployment completed at $(date)" >> /home/asphaltcalculator.co/deploy_log.txt

# Report success
echo "Deployment process completed successfully!"
