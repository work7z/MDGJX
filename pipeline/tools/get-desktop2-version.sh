#!/bin/bash
cd $MDGJX_ROOT
P_OVERRIDED_VERSION=$OVERRIDED_VERSION
if [ "$P_OVERRIDED_VERSION" = "" ]; then
    P_OVERRIDED_VERSION=$(node -pe 'require("./version.json").desktop2')
fi

newVer=`echo $P_OVERRIDED_VERSION | sed 's/desktop2-//g'`
echo $newVer
# for package.json, replace PLEASE_REPLACE_VERSION to newVer
sed -i '' "s/PLEASE_REPLACE_VERSION/$newVer/g" $MDGJX_ROOT/modules/desktop2/package.json