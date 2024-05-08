#!/bin/bash

export TEST_VERSION=v2.1.85-beta
export DOWNLOAD_URL=$PKG_DOWNLOAD_US_HOST/$TEST_VERSION/LafTools-$TEST_VERSION-windows-x64-minimal.zip

mkdir dist-web2
cd dist-web2
curl $DOWNLOAD_URL -o laftools.zip

