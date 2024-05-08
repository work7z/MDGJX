#!/bin/bash
set -e
cd $(dirname $0)
crtVersion=`cat $LAFTOOLS_ROOT/package.json | jq -r '.version'`
echo "Current version is $crtVersion"
rm -rf dist
mkdir -p dist
cd dist

curl $PKG_DOWNLOAD_US_HOST/$crtVersion/SHA256SUM.txt -O    

# CN: PKG_DOWNLOAD_CN_HOST
# US: PKG_DOWNLOAD_US_HOST
downloadToBinaryAndVerify(){
    platformName=$1
    fileName=LafTools-$crtVersion-$platformName-minimal.$2
    echo "Downloading $fileName"
    curl $PKG_DOWNLOAD_US_HOST/$crtVersion/$fileName -O    
    cat SHA256SUM.txt | grep $fileName | sha256sum -c
    if [ $? -ne 0 ]; then
        echo "Downloaded file $fileName is corrupted"
        exit 1
    else 
        echo "Downloaded file $fileName is verified"
    fi
}

downloadToBinaryAndVerify darwin-x64 tar.gz
downloadToBinaryAndVerify darwin-arm64 tar.gz
downloadToBinaryAndVerify linux-x64 tar.gz
downloadToBinaryAndVerify linux-arm64 tar.gz
downloadToBinaryAndVerify windows-x64 zip
downloadToBinaryAndVerify windows-arm64 zip

echo "[I] All files are downloaded and verified"
