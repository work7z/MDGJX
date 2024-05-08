#!/bin/bash

cd "$(dirname "$0")"
source ./env.sh
cd ..

SYSTEM_NODE_PREFIX=system-jre-17

downloadNodeJSToRuntime(){
    platformName=$1
    webLink=$2
    fileExt=$3
    sum=$4

    # check if webLink ends with fileExt
    if [[ ! $webLink =~ \.$fileExt$ ]]; then
        echo "webLink $webLink does not end with $fileExt"
        set -e
        exit 1
    fi

    crossPlatformDir=./cross-platform/$platformName

    mkdir -p $crossPlatformDir
    crtFile=$crossPlatformDir/$SYSTEM_NODE_PREFIX.$fileExt

    rm -f $crtFile 
    wget $webLink -O $crtFile
    shasum -a 256 $crtFile | grep $sum 
    if [ $? -ne 0 ]; then
        echo "verify $platformName failed, the sum is $sum, expect $(shasum -a 256 $crtFile)"
        set -e
        exit 1
    else 
        echo "verified $platformName at $(pwd)"
    fi


}


downloadNodeJSToRuntime linux-x64 https://github.com/ibmruntimes/semeru17-binaries/releases/download/jdk-17.0.8.1%2B1_openj9-0.40.0/ibm-semeru-open-jre_x64_linux_17.0.8.1_1_openj9-0.40.0.tar.gz tar.gz 3fbfda5ac68c81dd1535203b4ed9e0f3943ce4eca5c74d9fb0a0d6146fee53e3
downloadNodeJSToRuntime linux-arm64 https://github.com/ibmruntimes/semeru17-binaries/releases/download/jdk-17.0.8.1%2B1_openj9-0.40.0/ibm-semeru-open-jre_aarch64_linux_17.0.8.1_1_openj9-0.40.0.tar.gz tar.gz 1cc6116a42b0f014468fe5c8b303743722b39468319f5db3a677f4a2d0e61e4b
downloadNodeJSToRuntime darwin-x64 https://github.com/ibmruntimes/semeru17-binaries/releases/download/jdk-17.0.8.1%2B1_openj9-0.40.0/ibm-semeru-open-jre_x64_mac_17.0.8.1_1_openj9-0.40.0.tar.gz tar.gz 82d1e1dd01df31d04d43d910c90208ce16556da78edf7bf8a9812e84fbe4cadb
downloadNodeJSToRuntime darwin-arm64 https://github.com/ibmruntimes/semeru17-binaries/releases/download/jdk-17.0.8.1%2B1_openj9-0.40.0/ibm-semeru-open-jre_aarch64_mac_17.0.8.1_1_openj9-0.40.0.tar.gz tar.gz f5c922ad6a0be1cc4371b96c6ed6efde4790d8c05827b0a0fb3e633459f4b8e0
downloadNodeJSToRuntime windows-x64 https://github.com/ibmruntimes/semeru17-binaries/releases/download/jdk-17.0.8.1%2B1_openj9-0.40.0/ibm-semeru-open-jre_x64_windows_17.0.8.1_1_openj9-0.40.0.zip zip b17618f30ea0b59c9eca4429cfca5ae7c0973d25afa0a63a95e9b2d9038aeda4
downloadNodeJSToRuntime windows-arm64 https://cache-redirector.jetbrains.com/intellij-jbr/jbr-17.0.9-windows-aarch64-b1000.46.tar.gz tar.gz b1770f6ce63c549f828f78c3ed1e3934c43f8906c1d93173b097fddc06110577

echo "[I] $(date) Completed."