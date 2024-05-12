#!/bin/bash
ver=$1 
set +e
cd $MDGJX_ROOT/modules/server2
chmod +x ./docker/*.sh
echo "[I] $(date) Building server2..."
docker build -t localbuild/server2-linux-x64:$ver -f ./Dockerfile .
# chmod +x ./docker/run-docker.sh
# ./docker/run-docker.sh server2-inst $ver 