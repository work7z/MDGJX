#!/bin/bash

# enter current script location
cd "$(dirname "$0")"
source ./env.sh
cd ..

rm -rf ./dev-toolkit
mkdir -p ./dev-toolkit

wget "https://groovy.jfrog.io/artifactory/dist-release-local/groovy-zips/apache-groovy-sdk-4.0.15.zip" -O ./dev-toolkit/groovy-4.0.zip
(
    cd dev-toolkit
    shasum -a 256 groovy-4.0.zip | grep f1c30a8ff9a14692b05156e22ab75f6ae86212e4ebe955df074d0026d49b6307
    if [ $? -ne 0 ]; then
        echo "verify failed, the sum is $sum, expect $(shasum -a 256 groovy-4.0.zip)"
        set -e
        exit 1
    fi 
    unzip groovy-4.0.zip
)

doJDK(){
    wget "https://github.com/ibmruntimes/semeru17-binaries/releases/download/jdk-17.0.8.1%2B1_openj9-0.40.0/ibm-semeru-open-jdk_x64_mac_17.0.8.1_1_openj9-0.40.0.tar.gz" -O ./dev-toolkit/ibm-semeru-open-jdk_x64_mac_17.0.8.1_1_openj9-0.40.0.tar.gz
(
    cd dev-toolkit
    shasum -a 256 ibm-semeru-open-jdk_x64_mac_17.0.8.1_1_openj9-0.40.0.tar.gz | grep 5e5ef3e21c7d0e6a4e4a9f4c848bf6fb91c9f5e7ee85fa356ec886d6f72ecfef
    if [ $? -ne 0 ]; then
        echo "verify failed, the sum is $sum, expect $(shasum -a 256 ibm-semeru-open-jdk_x64_mac_17.0.8.1_1_openj9-0.40.0.tar.gz)"
        set -e
        exit 1
    fi
    gunzip ibm-semeru-open-jdk_x64_mac_17.0.8.1_1_openj9-0.40.0.tar.gz
    tar -xvf ibm-semeru-open-jdk_x64_mac_17.0.8.1_1_openj9-0.40.0.tar
)
}


doNodeJS(){
    wget https://nodejs.org/dist/latest-v8.x/node-v8.17.0-darwin-x64.tar.xz  -O ./dev-toolkit/node-v8.17.0-darwin-x64.tar.xz
shasum -a 256 ./dev-toolkit/node-v8.17.0-darwin-x64.tar.xz | grep
(
    cd dev-toolkit
    shasum -a 256 node-v8.17.0-darwin-x64.tar.xz | grep b6ef86df44292ba65f2b9a81b99a7db8de22a313f9c5abcebb6cf17ec24e2c97
    if [ $? -ne 0 ]; then
        echo "verify failed, the sum is $sum, expect $(shasum -a 256 node-v8.17.0-darwin-x64.tar.xz)"
        set -e
        exit 1
    fi
    tar -xvf node-v8.17.0-darwin-x64.tar.xz
)

}

doNodeJS

echo "[I] $(date) Completed."