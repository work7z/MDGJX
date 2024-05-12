#!/bin/bash
ver=$1 # example: ver=v3.5.$(date +%Y%m%d%H%M%S)
set +e
cd $MDGJX_ROOT/modules/server2
chmod +x ./docker/*.sh
echo "[I] $(date) Building server2..."
docker build -t localbuild/server2-linux-x64:$ver -f ./Dockerfile .
# chmod +x ./docker/run-docker.sh
# ./docker/run-docker.sh server2-inst $ver