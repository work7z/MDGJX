#!/bin/bash
while [ 1 -eq 1 ];
do

(
    cd $LAFTOOLS_ROOT/modules/web2
    npx vitest run -t "generate-app-op-detail-list"
)
(
    cd $LAFTOOLS_ROOT
    npm run fe-scan-zh
)
(
    $LAFTOOLS_ROOT/devtools/docs-generator/pipeline/build.sh
)
sleep 30
done