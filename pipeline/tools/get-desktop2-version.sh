#!/bin/bash
cd $MDGJX_ROOT
P_OVERRIDED_VERSION=$OVERRIDED_VERSION
if [ "$P_OVERRIDED_VERSION" = "" ]; then
    P_OVERRIDED_VERSION=$(node -pe 'require("./modules/desktop2/package.json").version')
fi
echo $P_OVERRIDED_VERSION