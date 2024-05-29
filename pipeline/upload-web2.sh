#!/bin/bash
uploadType=$1 # release or test

cd $MDGJX_ROOT
finFolder=/home/appuser/dkstatic/$uploadType
ssh $SERVER_2H2G -p 26609 "mkdir -p $finFolder/web2" 
sftp -P 26609  $SERVER_2H2G <<< "put -r dist/* $finFolder/web2/"