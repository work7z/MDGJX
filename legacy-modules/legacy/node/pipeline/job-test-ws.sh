#!/bin/bash


cd $(dirname $0)
cp ./source/test-input.json ./source/tmp-test-input.json
tmpIPTFile=./source/tmp-test-input.json
ts-node -T $LAFTOOLS_ROOT/modules/node/src/ws-index.ts  --max-old-space-size=20  --autoExitSeconds=20 --input-config-file=$tmpIPTFile 
