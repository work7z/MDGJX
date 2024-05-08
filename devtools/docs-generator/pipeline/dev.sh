#!/bin/bash
cd $(dirname $0)/..
# npm run dev 
while [ 1 -eq 1 ]; do
  npx tsc --outDir ./dist 
  node ./dist/gen.js
  sleep 10
done