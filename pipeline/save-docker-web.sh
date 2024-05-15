#!/bin/bash
source ~/.zshrc

if [ "$SERVER_2H4G" == "" ]; then
    echo "[E] SERVER_2H4G is not set"
    exit 1
fi

ver=$1

echo "[I] $(date) Building server2..."
docker images | grep  codegentoolbox/laftools-linux-x64:$ver | xargs -I {} docker rmi {} 
docker build -t codegentoolbox/laftools-linux-x64:$ver -f ./Dockerfile .
docker save codegentoolbox/laftools-linux-x64:$ver > web-linux-x64-$ver.TMPOUT
gzip web-linux-x64-$ver.TMPOUT

save-docker-image-and-push(){
    echo "[I] saving docker image and push"
    (
        cd $MDGJX_ROOT/modules/web
        ssh $SERVER_2H4G -p 26609 "mkdir -p /home/appuser/dkplace-web"
        sftp -P 26609  $SERVER_2H4G <<< "put web-linux-x64-$ver.TMPOUT.gz /home/appuser/dkplace-web"
        sftp -P 26609  $SERVER_2H4G <<< "put docker/run-docker.sh /home/appuser/dkplace-web/run-docker-$ver.sh"
        ssh $SERVER_2H4G -p 26609 "gunzip /home/appuser/dkplace-web/web-linux-x64-$ver.TMPOUT.gz"
        ssh $SERVER_2H4G -p 26609 "docker load -i /home/appuser/dkplace-web/web-linux-x64-$ver.TMPOUT"
        ssh $SERVER_2H4G -p 26609 "rm /home/appuser/dkplace-web/web-linux-x64-$ver.TMPOUT"
    )
}

save-docker-image-and-push