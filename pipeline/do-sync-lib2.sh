#!/bin/bash
echo "[I] Copying lib2 to web"
rm -rf $MDGJX_ROOT/modules/web/src/lib2-copy
cp -a $MDGJX_ROOT/modules/desktop2/src/lib2 $MDGJX_ROOT/modules/web/src/lib2-copy
echo "[I] Done"