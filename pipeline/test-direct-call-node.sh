#!/bin/bash

cd $(dirname $0)

$MDGJX_ROOT/modules/node/pipeline/build-tsx.sh

read -p '[I] press key to do ts-node testing'
time ts-node -T $MDGJX_ROOT/modules/node/src/ws-index.ts --mode=direct-call --direct-call-config=$MDGJX_ROOT/test/time-consumer/c-XJHDM/tmp-dc-1.json
read -p '[I] press key to do regular node testing'
time node $MDGJX_ROOT/modules/node/build/ws-index.js --mode=direct-call --direct-call-config=$MDGJX_ROOT/test/time-consumer/c-XJHDM/tmp-dc-1.json
