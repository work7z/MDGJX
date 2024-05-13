#!/bin/bash
cd $(dirname $0)/..
export PORT=2024
export NODE_ENV=development
rm -rf dist
npm run build && node dist/server.js