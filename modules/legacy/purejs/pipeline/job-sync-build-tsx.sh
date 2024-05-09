#!/bin/bash

shopt -s expand_aliases

# enter current dir

cd $(dirname $0)

# if md5 is not there, then use md5sum alias it
if [ "$(which md5sum)" = "" ];then
    echo "reset md5sum"
    alias md5sum=md5
fi

prevMD5=
while [ 1 -eq 1 ];
do
    crtMD5=$(find ../src/ -exec ls -al {} \; | md5sum)
    if [ "$prevMD5" != "$crtMD5" ];then
        echo "File changed, start to build"
        prevMD5=$crtMD5
        ./build-tsx.sh
    fi
    sleep 5
done