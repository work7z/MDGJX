#!/bin/bash
ver=$1 
source ~/.zshrc
set +e
cd $MDGJX_ROOT/modules/server2
chmod +x ./docker/*.sh
echo "[I] $(date) Building server2..."
docker rmi localbuild/server2-linux-x64:$ver
docker build -t localbuild/server2-linux-x64:$ver -f ./Dockerfile .
# chmod +x ./docker/run-docker.sh
# ./docker/run-docker.sh server2-inst $ver 
docker save localbuild/server2-linux-x64:$ver > server2-linux-x64-$ver.TMPOUT
gzip server2-linux-x64-$ver.TMPOUT
if [ "$SERVER_2H4G" == "" ]; then
    echo "[E] SERVER_2H4G is not set"
    exit 1
fi
ssh $SERVER_2H4G -p 26609 "mkdir -p /home/appuser/dkplace"
sftp -P 26609  $SERVER_2H4G "put server2-linux-x64-$ver.TMPOUT.gz /home/appuser/dkplace"
sftp -P 26609  $SERVER_2H4G "put docker/run-docker.sh /home/appuser/dkplace/run-docker-$ver.sh"