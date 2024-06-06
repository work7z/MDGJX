#!/bin/bash
uploadType=$1 # release or test
TAGNAME=$2
source ~/.zshrc
cd $MDGJX_ROOT/modules/desktop2/pkg-dist
mkdir -p ./$TAGNAME
cp -a ./MDGJX-* ./$TAGNAME
coscli-mac cp ./$TAGNAME cos://$BNAME/$uploadType/$TAGNAME/desktop2 -r