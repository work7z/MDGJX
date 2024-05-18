#!/bin/bash
ver=$1 
source ~/.zshrc
cd $MDGJX_ROOT/modules/server2
chmod +x ./docker/*.sh
echo "[I] $(date) Building server2..."
docker rmi localbuild/server2-linux-x64:$ver
docker build -t localbuild/server2-linux-x64:$ver -f ./Dockerfile .
docker save localbuild/server2-linux-x64:$ver > server2-linux-x64-$ver.TMPOUT
gzip server2-linux-x64-$ver.TMPOUT
if [ "$SERVER_2H4G" == "" ]; then
    echo "[E] SERVER_2H4G is not set"
    exit 1
fi
set -e
ssh $SERVER_2H4G -p 26609 "mkdir -p /home/appuser/dkplace"
sftp -P 26609  $SERVER_2H4G <<< "put server2-linux-x64-$ver.TMPOUT.gz /home/appuser/dkplace"
sftp -P 26609  $SERVER_2H4G <<< "put docker/run-docker.sh /home/appuser/dkplace/run-docker-$ver.sh"
ssh $SERVER_2H4G -p 26609 "gunzip /home/appuser/dkplace/server2-linux-x64-$ver.TMPOUT.gz"
ssh $SERVER_2H4G -p 26609 "docker load -i /home/appuser/dkplace/server2-linux-x64-$ver.TMPOUT"
ssh $SERVER_2H4G -p 26609 "rm /home/appuser/dkplace/server2-linux-x64-$ver.TMPOUT"
