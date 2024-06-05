#!/bin/bash
cd $MDGJX_ROOT
P_OVERRIDED_VERSION=$OVERRIDED_VERSION
if [ "$P_OVERRIDED_VERSION" = "" ]; then
    P_OVERRIDED_VERSION=$(node -pe 'require("./version.json").desktop2')
fi

# replace desktop2 to empty


echo $P_OVERRIDED_VERSION | sed 's/desktop2-//g'