#!/bin/bash
# this script is designated for testing this whole project.
set -e
cd $LAFTOOLS_ROOT
testPkgDir=$LAFTOOLS_ROOT/test-pkg
if [ -d $testPkgDir ]; then
    rm -rf $testPkgDir
fi
mkdir $testPkgDir
echo "[TEST-ALL]"
echo "[I] $(date) Testing at $testPkgDir..."

# /home/runner/work/LafTools/LafTools-M-pre/dist/pkg/
chmod +x $LAFTOOLS_ROOT/pipeline/tools/get-web2-version.sh
crtVersion=`$LAFTOOLS_ROOT/pipeline/tools/get-web2-version.sh`
echo "[I] crtVersion: $crtVersion"

cp -a $LAFTOOLS_ROOT/dist/pkg/LafTools-$crtVersion-linux-x64-minimal.tar.gz LafTools-pkg.tar.gz
tar -xzf LafTools-pkg.tar.gz 
cd `ls | grep LafTools | grep minimal`
echo "find results"
find . -iname 'run.sh'
echo "ls results"
ls
echo "start running, PWD is `pwd`"
if [ ! -f run.sh ]; then
    find .
    echo "[E] $(date) Test failed, run.sh not found"
    exit 1
fi
./run.sh & 
sleep 10 
# it should be running in 10s
curl 127.0.0.1:39899 -I | grep "200 OK"
if [ $? -ne 0 ]; then
    echo "[E] $(date) Test failed, unable to launch the service"
    exit 1
else 
    echo "[I] $(date) Test passed, service is running"
    exit 0
fi

curl 127.0.0.1:9988 | grep "description"
if [ $? -ne 0 ]; then
    echo "[E] $(date) Test failed, unable to launch the service"
    exit 1
else 
    echo "[I] $(date) Test passed, service is running"
fi
