#!/bin/bash

cd $(dirname $0)

source ./env.sh

cd $LAFTOOLS_ROOT

echo 'deleting dist folder...'
rm -rf dist/
mkdir -p dist/


compactResource(){
    cp -a ./resources/ ./dist/resources
    uglifyAllJSONInDir "./dist/resources"   
}

buildCoreForPlatform(){
    platformName=$1
    platformArch=$2
    platformGoFile=$3
    platformExt=bin
    argGOOS=$4
    if [ $platformName == "windows-x64" ] || [ $platformName == "windows-arm64" ]; then
        platformExt=exe
    fi
    mkdir -p dist/$platformName
    echo "building $platformName"
    GOOS=$argGOOS GOARCH=$platformArch go build -o dist/$platformName/codegen-momentousness-$platformName.$platformExt core/app.go 

    echo "built, copy cross platform resources..."

    mkdir -p ./cross-platform/$platformName
    cp -a ./cross-platform/$platformName/* ./dist/$platformName/ &> /dev/null
    cp -a ./cross-platform-manual/$platformName/* ./dist/$platformName/ &> /dev/null

    echo "copy resource to dist/$platformName/..."
    cp -a ./dist/resources ./dist/$platformName/ 

    find dist -iname "*.bin" -exec chmod 755 {} \;
}

compactResource

buildCoreForPlatform linux-x64 amd64 "core/app_unix.go" linux
buildCoreForPlatform linux-arm64 arm64 "core/app_unix.go" linux
buildCoreForPlatform darwin-x64 amd64 "core/app_unix.go" darwin
buildCoreForPlatform darwin-arm64 arm64 "core/app_unix.go" darwin
buildCoreForPlatform windows-x64 amd64 "core/app_windows.go" windows
buildCoreForPlatform windows-arm64 arm64 "core/app_windows.go" windows



echo "[I] $(date) Completed."
