#!/bin/bash
ver=$1 
source ~/.zshrc
set +e
cd $MDGJX_ROOT/modules/server2
ssh $SERVER_2H4G -p 26609 "echo 'hello, world'"
