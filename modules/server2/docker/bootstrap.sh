#!/bin/bash
cd /opt/app
echo "running server2"
pm2 start 'npm run start' --name runs2
pm2 logs -f runs2