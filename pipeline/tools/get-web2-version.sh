#!/bin/bash
cd $SRV_MDGJX_ROOT
P_OVERRIDED_VERSION=$OVERRIDED_VERSION
if [ "$P_OVERRIDED_VERSION" = "" ]; then
    P_OVERRIDED_VERSION=$(node -pe 'require("./version.json").web2')
fi
echo $P_OVERRIDED_VERSION