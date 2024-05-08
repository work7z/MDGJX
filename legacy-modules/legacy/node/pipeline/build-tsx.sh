#!/bin/bash

set -e
cd "$(dirname "$0")/.."
echo "removing build..."
rm -rf build && mkdir build
echo "start building tsx..."
tsc --outDir build --pretty false
cp -a ./src/lib/ ./build/lib/
cp -a ./package.json ./build/package.json
cd ./build/
cnpm install -S --only=production

echo "[I] $(date) Completed"