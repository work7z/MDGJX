#!/bin/bash

set -e
# note that the following environment variables are required: (in .npmrc)
# ELECTRON_MIRROR=https://registry.npmmirror.com/electron/
# ELECTRON_BUILDER_BINARIES_MIRROR=http://registry.npmmirror.com/electron-builder-binaries/
# npm config set registry http://mirrors.cloud.tencent.com/npm/

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

copyMinimal(){
    fileOs=$1
    fileExt=$2
    pkgDistDir=./pkg-dist
    [ -d $pkgDistDir ] || rm -rf $pkgDistDir
    mkdir -p $pkgDistDir

    echo "[I] copying minimal files... $fileOs $fileName"
    tFile=$(ls $MDGJX_ROOT/dist/pkg | grep $fileOs | grep $fileExt | head -n 1)
    echo "[I] copying $tFile"
    if [ -z $tFile ]; then
        echo "[E] $fileOs $fileExt not found"
        exit 1
    fi
    f_tFile=$MDGJX_ROOT/dist/pkg/$tFile
    echo "[I] decompressing $f_tFile"
    if [ $fileExt == "zip" ]; then
        unzip -o $f_tFile -d $pkgDistDir
    else
        tar -xzf $f_tFile -C $pkgDistDir
    fi
}

echo "[I] windows"
copyMinimal windows-x64 zip
npx electron-builder -w
copyMinimal windows-arm64 zip
npx electron-builder --arm64 -w

echo "[I] linux"
copyMinimal linux-x64 tar.gz
npx electron-builder -l
copyMinimal linux-arm64 tar.gz
npx electron-builder --arm64 -l

echo "[I] macos"
copyMinimal darwin-x64 tar.gz
npx electron-builder -m
copyMinimal darwin-arm64 tar.gz
npx electron-builder --arm64

pkgDir=$PWD/pkg-dist
[ -d $pkgDir ] || mkdir -p $pkgDir
mv ./dist/* $pkgDir

echo "[I] done"