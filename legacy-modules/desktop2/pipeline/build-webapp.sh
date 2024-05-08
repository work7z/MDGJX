#!/bin/bash
cd $(dirname $0)
cd webapp
rm -rf dist
npm run build