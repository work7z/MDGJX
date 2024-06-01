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



    targetFile=./src/core/d-pkginfo.ts
    if [ ! -f $targetFile ]; then
        echo "[E] $targetFile is not found."
        exit 1
    fi

    echo "
import { AppInfoClz } from \"./d-types\"


    const item:AppInfoClz ={ 
    \"version\": \"$crtVersion\",
    \"releaseDate\": \"$(date +%Y-%m-%d)\",
    \"timestamp\": \"$(date +%s)\"
    } 
    export default item
    " > $targetFile


echo "[I] cleaning up..."
rm -rf node_modules
rm -rf dist
rm -rf build
rm -rf src-dist
rm -rf pages-dist
echo "[I] installing dependencies..."
npm i -S -D --force

echo "[I] compiling tsc files..."
npm run compileTS


echo "[I] prunning dependencies..."
rm -rf node_modules
npm i -S -D --force --omit=dev


echo "[I] building electron app..."

mkdir -p ./pages-dist
crtPageDist=$PWD/pages-dist
(
    cd ./pages/local
    npm i -S -D --force
    npm run build
    mkdir -p $crtPageDist/local
    cp -a ./dist/* $crtPageDist/local
)

mkdir -p ./dist
cp -a ./src-dist dist/src-dist


echo "[I] building electron app for x64..."

copyMinimal(){
    fileOs=$1
    fileExt=$2
    echo "[I] deleting pkg-dist..."
    minimalDistDir=./minimal-dist
    if [ -d $minimalDistDir ]; then
        rm -rf $minimalDistDir
    fi
    mkdir -p $minimalDistDir

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
        unzip -q -o $f_tFile -d $minimalDistDir
    else
        tar -xzf $f_tFile -C $minimalDistDir
    fi
    chmod +x $MDGJX_ROOT/pipeline/tools/get-web2-version.sh
    web2_crtVersion=`$MDGJX_ROOT/pipeline/tools/get-web2-version.sh`

    mv $minimalDistDir/MDGJX-* $minimalDistDir/MDGJX
}

build-windows-x64(){
    echo "[I] windows x64"
    copyMinimal windows-x64 zip
    npx electron-builder -w
}

build-windows-arm64(){
    echo "[I] windows arm64"
    copyMinimal windows-arm64 zip
    npx electron-builder --arm64 -w
}

build-linux-x64(){
    echo "[I] linux x64"
    copyMinimal linux-x64 tar.gz
    npx electron-builder -l
}

build-linux-arm64(){
    echo "[I] linux arm64"
    copyMinimal linux-arm64 tar.gz
    npx electron-builder --arm64 -l
}

build-darwin-x64(){
    echo "[I] darwin x64"
    copyMinimal darwin-x64 tar.gz
    npx electron-builder -m
}

build-darwin-arm64(){
    echo "[I] darwin arm64"
    copyMinimal darwin-arm64 tar.gz
    npx electron-builder --arm64
}


# build-windows-x64
# build-windows-arm64
# build-linux-x64
# build-linux-arm64
# build-darwin-x64
# build-darwin-arm64

$1

pkgDir=$PWD/pkg-dist
[ -d $pkgDir ] || mkdir -p $pkgDir
mv ./dist/* $pkgDir

echo "[I] done"