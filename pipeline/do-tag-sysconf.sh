#!/bin/bash

(
    cd $SRV_MDGJX_ROOT
    git status|grep modified
    if [ $? -eq 0 ]; then
        echo "Please commit your changes before tagging"
        exit 1
    fi

    set -e
    version=sysconf-`jq '.version' $SRV_MDGJX_ROOT/modules/sysconf/package.json -r` 
    tagName=$version
    git tag $tagName
    git push origin $tagName
)
