#!/bin/bash

(
    cd $LAFTOOLS_ROOT
    npm run fe-scan-zh
)
(
    $LAFTOOLS_ROOT/devtools/docs-generator/pipeline/build.sh
)
sleep 30
done