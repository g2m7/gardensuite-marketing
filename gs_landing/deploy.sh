#!/bin/bash
set -e

echo "Building production bundle locally..."
bun run build

echo "Syncing build and assets to VPS..."
ssh root@gardensuite.in "mkdir -p /root/gs_landing"
rsync -avz --delete build/ root@gardensuite.in:/root/gs_landing/build/
rsync -avz static/ root@gardensuite.in:/root/gs_landing/static/
rsync -avz package.json server.cjs root@gardensuite.in:/root/gs_landing/

echo "Restarting PM2 process..."
ssh root@gardensuite.in << 'EOF'
  cd /root/gs_landing
  pm2 restart gardensuite-landing || pm2 start server.cjs --name 'gardensuite-landing'
  pm2 save
EOF

echo "Done! App deployed and restarted."
