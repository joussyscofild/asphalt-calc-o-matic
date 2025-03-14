
#!/bin/bash

# Navigate to your project directory
cd /home/your_website_username/public_html/

# Pull the latest changes
git pull origin main

# Install dependencies
npm install

# Build the project
npm run build

# Optional: Log deployment time
echo "Deployment completed at $(date)" >> /home/your_website_username/deploy_log.txt

# Optional: Add error handling
if [ $? -eq 0 ]; then
  echo "Build successful!"
else
  echo "Build failed!"
  exit 1
fi
