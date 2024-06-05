#!/bin/bash
cd $SRV_MDGJX_ROOT
P_OVERRIDED_VERSION=$OVERRIDED_VERSION
if [ "$P_OVERRIDED_VERSION" = "" ]; then
    P_OVERRIDED_VERSION=$(node -pe 'require("./version.json").desktop2')
fi

echo $P_OVERRIDED_VERSION | sed 's/desktop2-//g'