#!/bin/bash
export TXCOSID=$1
export TXCOSKEY=$2
if [ -z "$TXCOSID" ]; then
  echo "TXCOSID is required"
  exit 1
fi
if [ -z "$TXCOSKEY" ]; then
  echo "TXCOSKEY is required"
  exit 1
fi
echo "TXCOSID: $TXCOSID xxxxxxxxx"
echo "TXCOSKEY: $TXCOSKEY xxxxxxxxx"
npm i -S -D --force
set -e
node ./refresh-cdn-cache.js
node ./push-url-cache.js