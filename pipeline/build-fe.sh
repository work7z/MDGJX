#!/bin/bash
testRunServer=$1
echo "[I] building fe"
(
    echo "[I] building web"
    cd $MDGJX_ROOT/modules/web
    npm run build
)
(
    echo "[I] building web-server"
    cd $MDGJX_ROOT/modules/web-server
    rm -rf dist
    npm run build
    cp -a ./node_modules ./dist
    cp -a $MDGJX_ROOT/modules/web/dist ./dist/spa
    [ -d $MDGJX_ROOT/dist/web ] && rm -rf $MDGJX_ROOT/dist/web
    mkdir -p $MDGJX_ROOT/dist/web
    cp -a dist $MDGJX_ROOT/dist/web
    echo "[I] fe bundle size: $(du -sh $MDGJX_ROOT/dist/web)"
)

echo "[I] built fe"

if [ "$testRunServer" == "test" ]; then
    echo "[I] testing run server"
    (
        echo "[I] testing web-server"
        export NODE_ENV=production
        export PORT=39899
        cd $MDGJX_ROOT/dist/web/dist
        node ./server.js
    )
fi
