#!/bin/bash
cd $MDGJX_ROOT/modules/web/src/seo
npx vitest run -t "seo-prerender"
npx vitest run -t "seo-blend-it"