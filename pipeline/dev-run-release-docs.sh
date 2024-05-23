#!/bin/bash

(
    cd $MDGJX_ROOT
    npm run fe-scan-zh
)
(
    $MDGJX_ROOT/devtools/docs-generator/pipeline/build.sh
)
sleep 30
done