#!/bin/bash
set -e
testRunServer=$1
echo "[I] building fe"

echo "[I] building web"
cd $MDGJX_ROOT/modules/web
[ -d node_modules ] && rm -rf node_modules
[ ! -d node_modules ] && npm i -S -D --force 
npm run build

echo "[I] blending seo files"
export WEB_DIST_DIR=$MDGJX_ROOT/modules/web/dist
export WEB_HTML_DIR=$MDGJX_ROOT/modules/web-server/html
cd $MDGJX_ROOT/modules/web/src/seo
npx vitest run -t "seo-blend-it"

echo "[I] building release cleancache"
cd $MDGJX_ROOT/devtools/release
[ -d node_modules ] && rm -rf node_modules
npm i -S -D --verbose --force

echo "[I] building addons"
cd $MDGJX_ROOT/addons/it-tools
[ -d node_modules ] && rm -rf node_modules
npm i -S -D --verbose --force
npm run build

echo "[I] building web-server"
cd $MDGJX_ROOT/modules/web-server

[ -d dist ] && rm -rf dist
[ ! -d dist ] && mkdir -p dist

echo "[I] copying required node_modules, pwd is $PWD"    
[ -d node_modules ] && rm -rf node_modules
npm i --omit=dev --force  

mkdir -p ./dist/node_modules
cp -a ./node_modules/* ./dist/node_modules

ctnNodeModules=$(ls ./dist/node_modules | wc -l)
if [ $ctnNodeModules -lt 1 ]; then
    echo "[E] node_modules not copied"
    exit 1
fi

echo "[I] building web-server"
[ -d node_modules ] && rm -rf node_modules
[ ! -d node_modules ] && npm i -S -D --force  

npm run build
cp -a $MDGJX_ROOT/modules/web/dist ./dist/spa
cp -a $MDGJX_ROOT/addons/it-tools/dist ./dist/xtools
[ -d $MDGJX_ROOT/dist/web ] && rm -rf $MDGJX_ROOT/dist/web
mkdir -p $MDGJX_ROOT/dist/web
cp -a dist $MDGJX_ROOT/dist/web
echo "[I] fe bundle size: $(du -sh $MDGJX_ROOT/dist/web)"


echo "[I] built fe"

# if [ "$testRunServer" == "test" ]; then
#     echo "[I] testing run server"
#     (
#         echo "[I] testing web-server"
#         export NODE_ENV=production
#         export PORT=39899
#         cd $MDGJX_ROOT/dist/web/dist
#         node ./server.js
#     )
# fi
