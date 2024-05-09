#!/bin/bash

set -e
cd "$(dirname "$0")/.."

# function buildWithModule(){
#     subDIR=$1
#     subModule=$2
#     echo "start job for $subModule..."
#     tsc --outDir $1 --pretty false --module $subModule
# }

echo "removing build..."
rm -rf build && mkdir build

# buildWithModule build/commonjs commonjs
# buildWithModule build/amd amd 
npm run gen
rm -rf build/lang
cp -a ./src/lang/ build/lang/

targetDir=$LAFTOOLS_ROOT/resources/public/purejs

mkdir -p $targetDir 

pwd
echo $targetDir
cp -a ./build/* $targetDir
# rsync -av --delete ./build/ $targetDir
# rsync -av ./build/ $targetDir

echo "[I] $(date) Completed"