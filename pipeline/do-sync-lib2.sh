#!/bin/bash
echo "[I] Copying lib2 to web"
workForDir(){
    rm -rf $1
    cp -a $MDGJX_ROOT/modules/desktop2/src/lib2 $1
}
workForDir $MDGJX_ROOT/modules/web/src/lib2-copy
workForDir $MDGJX_ROOT/modules/desktop2/pages/local/src/lib2-copy
echo "[I] Done"