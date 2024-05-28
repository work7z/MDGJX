#!/bin/bash

git status|grep modified
if [ $? -eq 0 ]; then
    echo "Please commit your changes before tagging"
    exit 1
fi

set -e
version=desktop2-`jq '.version' $MDGJX_ROOT/modules/desktop2/package.json -r` 
tagName=$version
git tag $tagName
git push origin $tagName
