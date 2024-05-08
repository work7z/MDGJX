// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package config

import (
	"laftools-go/core/project/syspath"
	"testing"
)

func TestGetUserConfigFromFile(t *testing.T) {
	got, err := syspath.GetUserConfigFromFile()
	if err != nil {
		t.Fatal("Should no err", err)
	} else {
		t.Log("Got obj", got)
	}
}
