#!/bin/bash
cd $(dirname $0)
crtDIR=$(pwd)
set -e
cd dist
crtVersion=`cat $LAFTOOLS_ROOT/package.json | jq -r '.version'`
echo "Current version is $crtVersion"
# CN: PKG_UPLOAD_CN_HOST
# US: PKG_UPLOAD_US_HOST

uploadToCos(){
    platformName=$1
    fileName=LafTools-$crtVersion-$platformName-minimal.$2
    echo "Uploading $fileName to COS"
    $crtDIR/coscli.exe cp $fileName cos://$TXCOSBUCKET/$crtVersion/$fileName
    echo "Uploaded $fileName to COS"
}

uploadToCos darwin-x64 tar.gz
uploadToCos darwin-arm64 tar.gz
uploadToCos linux-x64 tar.gz
uploadToCos linux-arm64 tar.gz
uploadToCos windows-x64 zip 
uploadToCos windows-arm64 zip 
$crtDIR/coscli.exe cp SHA256SUM.txt cos://$TXCOSBUCKET/$crtVersion/SHA256SUM.txt


echo "[I] All files are uploaded to COS"