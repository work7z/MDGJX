// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package env

import (
	"fmt"
	"os"
	"path"
	"runtime"
)

func GetEnvValueForLafToolsRoot() string {
	a := os.Getenv("LAFTOOLS_ROOT")
	if a != "" {
		return a
	}
	_, file, line, ok := runtime.Caller(0)
	if ok {
		fmt.Printf("File: %s, Line: %d\n", file, line)
		return path.Join(path.Dir(file), "..", "..")
	} else {
		fmt.Println("Could not get location")
	}
	return ""
}
