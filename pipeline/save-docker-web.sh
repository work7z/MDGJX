#!/bin/bash
source ~/.zshrc

set -e

save-docker-image-and-push(){
    echo "[I] saving docker image and push"
    (
        cd $MDGJX_ROOT/modules/web
        ssh $SERVER_2H4G -p 26609 "mkdir -p /home/appuser/dkplace-web"
        sftp -P 26609  $SERVER_2H4G <<< "put server2-linux-x64-$ver.TMPOUT.gz /home/appuser/dkplace-web"
        sftp -P 26609  $SERVER_2H4G <<< "put docker/run-docker.sh /home/appuser/dkplace-web/run-docker-$ver.sh"
        ssh $SERVER_2H4G -p 26609 "gunzip /home/appuser/dkplace-web/server2-linux-x64-$ver.TMPOUT.gz"
        ssh $SERVER_2H4G -p 26609 "docker load -i /home/appuser/dkplace-web/server2-linux-x64-$ver.TMPOUT"
        ssh $SERVER_2H4G -p 26609 "rm /home/appuser/dkplace-web/server2-linux-x64-$ver.TMPOUT"
    )
}

save-docker-image-and-push