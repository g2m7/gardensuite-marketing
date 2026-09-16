#!/bin/bash
set -e

echo "Packaging gs_landing..."
LOCAL_ZIP="/tmp/gs_landing_deploy.zip"
rm -f "$LOCAL_ZIP"
zip -r "$LOCAL_ZIP" . -x "node_modules/*" -x ".svelte-kit/*" -x "build/*" -x ".git/*" -x ".DS_Store"

echo "Uploading to VPS..."
scp "$LOCAL_ZIP" root@gardensuite.in:/tmp/gs_landing_deploy.zip
rm -f "$LOCAL_ZIP"

echo "Deploying on VPS..."
ssh root@gardensuite.in << 'EOF'
  mkdir -p /root/gs_landing
  cd /root/gs_landing
  unzip -o /tmp/gs_landing_deploy.zip
  rm /tmp/gs_landing_deploy.zip
  echo "Installing dependencies..."
  npm install
  echo "Building SvelteKit app..."
  npm run build
  echo "Restarting PM2 process..."
  pm2 restart gardensuite-landing || pm2 start server.cjs --name 'gardensuite-landing'
  pm2 save
EOF

echo "Done! App deployed and restarted."
