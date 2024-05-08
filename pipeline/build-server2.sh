#!/bin/bash
set +e
cd $LAFTOOLS_ROOT/modules/server2
chmod +x ./docker/*.sh
echo "packing dist..."
tar -czf docker-dist.tar.gz .
ls -ahlrt
pwd