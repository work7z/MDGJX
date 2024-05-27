#!/bin/bash
rm -rf dist
npm run build
echo "start running..."
cross-env NODE_ENV=development node dist/server.js