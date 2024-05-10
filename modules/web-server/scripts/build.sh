#!/bin/bash
cd $(dirname $s0)/..
rm -rf dist
npm run download
npm run build