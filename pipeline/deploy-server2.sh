#!/bin/bash
ver=$1 
source ~/.zshrc
set +e
cd $MDGJX_ROOT/modules/server2
ssh $SERVER_2H4G -p 26609 "echo 'hello, production'"
ssh $SERVER_2H4G -p 26609 "/home/appuser/dkplace/run-docker-$ver.sh server2-inst $ver"