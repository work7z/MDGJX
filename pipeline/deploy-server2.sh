#!/bin/bash
ver=$1 
port=$2

set +e
source ~/.zshrc
cd $MDGJX_ROOT/modules/server2
ssh $SERVER_2H4G -p 26609 "echo 'hello, production'"
pwd
containerName=server2-inst
# 2017 -> beta
# 2016 -> release
if [[ "$port" == *"2017"* ]]; then
    echo "Deploying web to beta"
    containerName=server2-beta-inst
else
    echo "Deploying server2 to production"
fi

echo "Deploying Server2 to production with version $ver..."
ssh $SERVER_2H4G -p 26609 "/home/appuser/dkplace/run-docker-$ver.sh $containerName $ver $port"