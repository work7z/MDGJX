#!/bin/bash
rm -rf dist
npm run build
cross-env NODE_ENV=development node dist/server.js