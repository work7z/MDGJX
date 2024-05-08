#!/bin/bash
cd $LAFTOOLS_ROOT/myproject
# wails build -platform=darwin/amd64,darwin/arm64,linux/amd64,linux/arm64,windows/amd64,windows/arm64 -ldflags "-s -w"  
#  darwin,darwin/amd64,darwin/arm64,darwin/universal,linux,linux/amd64,linux/arm64,linux/arm,windows,windows/amd64,windows/arm64,windows/386


# build wails binary for darwin/amd64,darwin/arm64,linux/amd64,linux/arm64,windows/amd64,windows/arm64 separtely one by one, note that you should provide their proper extension on different os. besides, you should also provide proper extension for the binary file, like .exe for windows, .app for macos, .deb for linux, etc.
wails build -platform=darwin/amd64 -ldflags "-s -w" -o myproject-darwin-amd64
wails build -platform=darwin/arm64 -ldflags "-s -w" -o myproject-darwin-arm64
wails build -platform=linux/amd64 -ldflags "-s -w" -o myproject-linux-amd64
wails build -platform=linux/arm64 -ldflags "-s -w" -o myproject-linux-arm64
wails build -platform=windows/amd64 -ldflags "-s -w" -o myproject-windows-amd64.exe
wails build -platform=windows/arm64 -ldflags "-s -w" -o myproject-windows-arm64.exe
