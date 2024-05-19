#!/bin/bash
ver=$1 
port=$2
set +e
source ~/.zshrc
cd $MDGJX_ROOT/modules/web
ssh $SERVER_2H4G -p 26609 "echo 'hello, production'"
pwd
echo "Deploying web to production"
# todo: chmod this file
# for beta server, we maybe can make it listen on other port
ssh $SERVER_2H4G -p 26609 "chmod +x /home/appuser/dkplace-web/run-docker-$ver.sh"
containerName=web-inst
# if ver contain beta, then deploy to beta server
if [[ "$port" == *"2025"* ]]; then
    echo "Deploying web to beta"
    containerName=web-beta-inst
else
    echo "Deploying web to production"
fi
ssh $SERVER_2H4G -p 26609 "/home/appuser/dkplace-web/run-docker-$ver.sh $containerName $ver $port" # port 2024(release) or 2025(beta)


# cd $MDGJX_ROOT/devtools/release
# chmod +x ./refresh-cdn.sh
# ./refresh-cdn.sh "${{secrets.TXCOSID}}" "${{secrets.TXCOSKEY}}"
