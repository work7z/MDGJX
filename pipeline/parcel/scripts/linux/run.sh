#!/bin/bash

export HOSTNAME=0.0.0.0
export PORT=39899

if [ ! -f ./bin/node/bin/node ]; then
    echo "[I] skip downloading runtime"
else
    echo "[I] ERROR: runtime nodejs not found, please download it first! (Node.js v20+)"
fi
# set as prod
export NODE_ENV=production
node ./boot/pre-entrypoint.js --type=web2