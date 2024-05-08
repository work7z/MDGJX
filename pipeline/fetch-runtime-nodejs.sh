#!/bin/bash

cd "$(dirname "$0")"
source ./env.sh
cd ..


SYSTEM_NODE_PREFIX=system-node

downloadNodeJSToRuntime(){
    platformName=$1
    webLink=$2
    fileExt=$3
    sum=$4
    crossPlatformDir=./cross-platform/$platformName

    # check if webLink ends with fileExt
    if [[ ! $webLink =~ \.$fileExt$ ]]; then
        echo "webLink $webLink does not end with $fileExt"
        set -e
        exit 1
    fi


    mkdir -p $crossPlatformDir
    crtFile=$crossPlatformDir/$SYSTEM_NODE_PREFIX.$fileExt

    rm -f $crtFile 
    curl $webLink --output $crtFile
    shasum -a 256 $crtFile | grep $sum 
    if [ $? -ne 0 ]; then
        echo "[WARNING] verify $platformName failed, the sum is $sum"
        # set -e
        # exit 1
    fi

    if [ $fileExt == "tar.gz" ]; then
        tar -xzvf $crtFile -C $crossPlatformDir
    elif [ $fileExt == "zip" ]; then
        unzip -o $crtFile -d $crossPlatformDir
    else
        echo "unsupported fileExt $fileExt"
        set -e
        exit 1
    fi

    nodeDirName=$(ls $crossPlatformDir | grep node-v)
    mv $crossPlatformDir/$nodeDirName $crossPlatformDir/node-dir
}


downloadNodeJSToRuntime linux-x64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-x64.tar.gz tar.gz bf3a779bef19452da90fb88358ec2c57e0d2f882839b20dc6afc297b6aafc0d7    
downloadNodeJSToRuntime linux-arm64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-arm64.tar.gz tar.gz e34ab2fc2726b4abd896bcbff0250e9b2da737cbd9d24267518a802ed0606f3b  
downloadNodeJSToRuntime darwin-x64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-darwin-x64.tar.gz tar.gz c52e7fb0709dbe63a4cbe08ac8af3479188692937a7bd8e776e0eedfa33bb848        
downloadNodeJSToRuntime darwin-arm64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-darwin-arm64.tar.gz tar.gz e0065c61f340e85106a99c4b54746c5cee09d59b08c5712f67f99e92aa44995d      
downloadNodeJSToRuntime windows-x64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-x64.zip zip bc032628d77d206ffa7f133518a6225a9c5d6d9210ead30d67e294ff37044bda    
downloadNodeJSToRuntime windows-arm64 https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-arm64.zip zip e85461ec124956a2853c4ee6e13c4f4889d63c88beb3d530c1ee0c4b51dc10e7    



echo "[I] $(date) Completed."