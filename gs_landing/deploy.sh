#!/bin/bash
echo "Packaging gs_landing..."
rm -f ../gs_landing_deploy.zip
zip -r ../gs_landing_deploy.zip . -x "node_modules/*" -x ".svelte-kit/*" -x "build/*" -x ".git/*" -x ".DS_Store"

echo "Uploading to VPS..."
scp ../gs_landing_deploy.zip root@gardensuite.in:/tmp/gs_landing_deploy.zip

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
