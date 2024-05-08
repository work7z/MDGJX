#!/bin/bash
imageName=$1
if [ -z $imageName ]; then
    echo "[E] $(date) imageName is required"
    exit 1
fi
docker run -e ONLINEMODE=true -e LAFREGION=CN -e APPLANG=zh_CN --name $containerName -d -p 0.0.0.0:9988:39899 $imageName
sleep 20
curl 127.0.0.1:9988 -I | grep "200 OK"
if [ $? -ne 0 ]; then
    echo "[E] $(date) Test failed, unable to launch the service"
    exit 1
else 
    echo "[I] $(date) Test passed, service is running"
fi

curl 127.0.0.1:9988 | grep "description"
if [ $? -ne 0 ]; then
    echo "[E] $(date) Test failed, unable to launch the service"
    exit 1
else 
    echo "[I] $(date) Test passed, service is running"
fi
