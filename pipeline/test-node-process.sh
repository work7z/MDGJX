#!/bin/bash
cd $LAFTOOLS_ROOT
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestSendReqToNodeProcessForPerformance$ laftools-go/core/cmd -v
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestSendReqToNodeProcess$ laftools-go/core/cmd -v
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestSimplePutAndGet$ laftools-go/core/cmd -v
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestSimpleRunNode$ laftools-go/core/cmd -v
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestSimplePutAndGet$ laftools-go/core/cmd -v
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestGetAllSubExtCategory$ laftools-go/core/cmd -v
/usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestNodeMultipleRequest$ laftools-go/core/cmd -v




