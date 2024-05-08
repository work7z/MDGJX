#!/bin/bash

git status|grep modified
if [ $? -eq 0 ]; then
    echo "Please commit your changes before tagging"
    exit 1
fi

set -e
version=`jq '.version' $LAFTOOLS_ROOT/package.json -r` 
tagName=$version
git tag $tagName
echo "ok, tag it"
read -p "Do you want to push the tag $tagName to the remote repository? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    git push origin $tagName
fi