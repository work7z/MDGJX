#!/bin/bash
uploadType=$1 # release or test
TAGNAME=$2

cd $MDGJX_ROOT/modules/desktop2/pkg-dist
finFolder=/home/appuser/dkstatic/$uploadType/desktop2
ssh $SERVER_2H2G -p 26609 "mkdir -p $finFolder" 
# sftp -P 26609  $SERVER_2H2G <<< "put -r ./MDGJX-* $finFolder"
source ~/.zshrc
mkdir -p ./$TAGNAME
cp -a ./MDGJX-* ./$TAGNAME
coscli-mac cp ./$TAGNAME cos://$BNAME/$uploadType/$TAGNAME/desktop2 -r
