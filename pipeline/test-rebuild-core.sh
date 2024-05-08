#!/bin/bash
#
# ---------------
# {file}.sh test
#
rm -rf dev-dist
mkdir -p dev-dist

cd $LAFTOOLS_ROOT

destFile=dev-dist/dev-tools.bin
echo "building $destFile"
GOOS=darwin GOARCH=amd64 go build -o $destFile core/app.go core/app_unix.go

chmod +x $destFile
$destFile test

# show size of destFile in human-readable format
echo "Binary Size: $(ls -lh $destFile | awk '{print $5}')"
# show gzip size without modifying destFile in human-readable format
tmpGZIP=$destFile-gzip-type
cp $destFile $tmpGZIP
gzip $tmpGZIP
echo "Gziped Binary Size: $(ls -lh ${tmpGZIP}.gz | awk '{print $5}')"

if [[ "$1" = test ]];then 
    $destFile middleware --type call-by-fn-map --fn-map-id md2 --req-file dev-source/md2-req.json --wc-file dev-source/md2-wc.json --rs-file dev-dist/md2-output.json
    cat dev-dist/md2-output.json
    # {"CallLevel":"","StartTime":"0001-01-01T00:00:00Z","EndTime":"0001-01-01T00:00:00Z","Status":0,"Result":"d1e81c1b96eebd2c8e2fadad9f14d96c","Messages":null,"Warnings":null,"Errors":null,"Debugs":null}
fi 
echo ""
echo "[I] $(date) Completed."



