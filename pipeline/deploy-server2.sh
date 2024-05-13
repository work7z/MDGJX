#!/bin/bash
ver=$1 
set +e
source ~/.zshrc
cd $MDGJX_ROOT/modules/server2
ssh $SERVER_2H4G -p 26609 "echo 'hello, production'"
pwd
echo "Deploying Server2 to production"
ssh $SERVER_2H4G -p 26609 "/home/appuser/dkplace/run-docker-$ver.sh server2-inst $ver"