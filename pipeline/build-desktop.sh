#!/bin/bash
source ~/.zshrc
set -e
chmod +x $MDGJX_ROOT/pipeline/tools/get-web2-version.sh
crtVersion=`$MDGJX_ROOT/pipeline/tools/get-web2-version.sh`
if [ -z $crtVersion ]; then
    echo "[E] crtVersion is required."
    exit 1
fi
echo "[I] desktop build started..."
echo "[I] building desktop with crtVersion: $crtVersion"
cd $MDGJX_ROOT/modules/desktop2
echo "[I] cleaning up..."
[ -d build ] && rm -rf build
[ -d dist ] && rm -rf dist
[ -d node_modules ] && rm -rf node_modules
echo "[I] installing dependencies..."
npm i -S -D --force
echo "[I] building..."
npm run build
echo "[I] desktop build ended..."