#!/bin/bash

git status|grep modified
if [ $? -eq 0 ]; then
    echo "Please commit your changes before tagging"
    exit 1
fi

set -e
version=`jq '.web2' $MDGJX_ROOT/version.json -r` 
tagName=$version
git tag $tagName
git push origin $tagName

targetFile=$SRV_MDGJX_ROOT/modules/sysconf/release/web2/$tagName.js
if [ -f $targetFile ]; then
    echo "File $targetFile already exists, ignore to update it"
else 
    echo "
    export default {
    \"version\": \"$tagName\",
    \"minUpgradableVersion\": null, // null or string, null means no restriction
    \"description\": \"\", // when we generate the static files, the empty descirption is disallowed
    \"releaseDate\": \"$(date +%Y-%m-%d)\",
    \"timestamp\": \"$(date +%s)\"
    } 
    " > $targetFile
fi