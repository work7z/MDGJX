#!/bin/bash

set -e
# note that the following environment variables are required: (in .npmrc)
# ELECTRON_MIRROR=https://registry.npmmirror.com/electron/
# ELECTRON_BUILDER_BINARIES_MIRROR=http://registry.npmmirror.com/electron-builder-binaries/
npm config set registry http://mirrors.cloud.tencent.com/npm/

chmod +x $MDGJX_ROOT/pipeline/tools/get-desktop2-version.sh
crtVersion=v`$MDGJX_ROOT/pipeline/tools/get-desktop2-version.sh`

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


echo "[I] building electron app for x64..."

npx electron-builder -w
npx electron-builder -l
npx electron-builder -m
npx electron-builder --arm64
pkgDir=$PWD/pkg-dist
[ -d $pkgDir ] || mkdir -p $pkgDir
mv dist/* $pkgDir
cp dist/*.exe $pkgDir/MDGJX-$crtVersion-windows-x64.exe
cp dist/*.dmg $pkgDir/MDGJX-$crtVersion-macos-x64.dmg
cp dist/*.AppImage $pkgDir/MDGJX-$crtVersion-linux-x64.AppImage
# rm -rf dist

# echo "[I] building electron app for arm64..."
# npx electron-builder -w --arm64
# npx electron-builder -l --arm64
# npx electron-builder -m --arm64
# pkgDir=$PWD/pkg-dist
# [ -d $pkgDir ] || mkdir -p $pkgDir
# mv dist/*.exe $pkgDir/MDGJX-$crtVersion-windows-arm64.exe
# mv dist/*.dmg $pkgDir/MDGJX-$crtVersion-macos-arm64.dmg
# mv dist/*.AppImage $pkgDir/MDGJX-$crtVersion-linux-arm64.AppImage

echo "[I] done"