#!/bin/bash

echo "[I] $(date) decompressing linux tar file..."
echo "[I] APPLANG: $APPLANG"
tar -xzf /opt/app/linux.tar.gz
echo "[I] $(date) trigger run script"
cd `ls|grep LafTools`
export APPLANG=$APPLANG
./run.sh 