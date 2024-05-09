#!/bin/bash

chmod +x $LAFTOOLS_ROOT/pipeline/tools/get-web2-version.sh
crtVersion=`$LAFTOOLS_ROOT/pipeline/tools/get-web2-version.sh`

if [ -z $crtVersion ]; then
    echo "[E] crtVersion is required."
    exit 1
fi

echo "Current version: $crtVersion"

cd $(dirname $0)/..

echo "[I] cleaning up..."
rm -rf node_modules
rm -rf dist
rm -rf build
rm -rf src-dist
echo "[I] installing dependencies..."
npm i -S -D --force

echo "[I] compiling tsc files..."
npm run compileTS


echo "[I] prunning dependencies..."
rm -rf node_modules
npm i -S -D --force --omit=dev


echo "[I] building electron app..."

mkdir -p ./dist
cp -a ./src-dist dist/src-dist


function build-electron(){
    type=$1
    name=$2
    npx electron-builder $type
}

build-electron "-l" linux-x64
build-electron "-w" windows-x64
build-electron "m" darwin-x64
build-electron "--arm64" darwin-arm64
