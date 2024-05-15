#!/bin/bash
ver=$1 
set +e
source ~/.zshrc
cd $MDGJX_ROOT/modules/web
ssh $SERVER_2H4G -p 26609 "echo 'hello, production'"
pwd
echo "Deploying Server2 to production"
# for beta server, we maybe can make it listen on other port
ssh $SERVER_2H4G -p 26609 "/home/appuser/dkplace-web/run-docker-$ver.sh web-inst $ver 2024"


# cd $MDGJX_ROOT/devtools/release
# chmod +x ./refresh-cdn.sh
# ./refresh-cdn.sh "${{secrets.TXCOSID}}" "${{secrets.TXCOSKEY}}"
