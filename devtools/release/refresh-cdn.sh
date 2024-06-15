#!/bin/bash
echo "TXCOSID: $TXCOSID xxxxxxxxx"
echo "TXCOSKEY: $TXCOSKEY xxxxxxxxx"
npm i -S -D --force
set -e
node ./refresh-cdn-cache.js
# node ./push-url-cache.js # not make it now