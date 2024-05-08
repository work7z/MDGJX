// Date: Sat, 18 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package env

import (
	"time"
)

// to start developing, update your own config in this file.
// note that you shouldn't commit this file unless any value really need to be updated.

var DefaultLafToolsRoot = GetEnvValueForLafToolsRoot()

var ShouldPrintLogAsJSON = false

// test stuff
// var EXIT_SECONDS = "30"
var EXIT_SECONDS = "5"
var WAKUP_TIMES int64 = 0
var USING_TSX_FOR_REAL_OUTPUT = true // for ws-index, true will use ts directly, otherwise will use js

var PUBLIC_RELOAD_FREQUENCY = time.Millisecond * 20 // check frequency
