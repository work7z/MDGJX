#!/bin/bash
file=$1
tmpfile=$1.tmp

cd $(dirname $0)

node ./reformat-with-Dot.js $file 

# echo "[I] Handling reformat-with-Dot for the file $file..."

# # use sed to replace Dot with other value, only replace first time
# newUUID=$(uuidgen | cut -c 1-4)
# sed '0,/Dot(/s//Nihao(/'  $file > $tmpfile

# echo "[I] Done."