#!/bin/bash
set -e
cleanAndCopy(){
    src=$1
    dest=$2
    echo "Cleaning $dest"
    rm -rf $dest
    echo "Copying $src to $dest"
    cp -a $src $dest
}
# copy item [1]
copyWeb2Share(){
    echo "Copying files from web to share"
    srcDir=$LAFTOOLS_ROOT/modules/web2/app/__CORE__/share
    cleanAndCopy $srcDir/. $LAFTOOLS_ROOT/modules/bootstrap/src/web2share-copy/
    cleanAndCopy $srcDir/. $LAFTOOLS_ROOT/modules/server2/src/web2share-copy/
}

copyWeb2Share
echo "done"