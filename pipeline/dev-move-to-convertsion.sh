#!/bin/bash
mt=$1
if [ -z "$mt" ]; then
    echo "Please provide match name"
    exit 1
fi
cd $(dirname $0)
cd ..   
ls  ./modules/web/src/lib/core/operations/*${mt}*
mv ./modules/web/src/lib/core/operations/*${mt}* ./modules/web/src/lib/tools/impl/conversion
echo "moved"