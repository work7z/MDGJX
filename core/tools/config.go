// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package tools

import (
	"laftools-go/core/project/base/env"
	"os"
)

const LEN_LIMIT_TRANSLATION_KEYS = 25

// TODO: align below with the new config file
var (
	RefId                 string         // for port information, if it's empty, then I will tell you in the home directory
	Mode                  string         // multiple values joined by comma, e.g. docker,online
	IsDevMode             bool   = true  // by default, it's true
	IsUATMode             bool   = false // by default, it's true
	SystemUserLanguage    string = "en_US"
	LafToolsAppBaseDir    string = env.GetEnvValueForLafToolsRoot()
	LafToolsHomeConfigDir string = os.Getenv("CODEGEN_APP_DIR")
)
