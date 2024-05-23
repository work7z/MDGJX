#!/bin/bash

cd "$(dirname "$0")"
source ./env.sh
cd ..

rm -rf ./cross-platform
mkdir -p ./cross-platform

# ./script/fetch-runtime-jre.sh
./script/fetch-runtime-nodejs.sh