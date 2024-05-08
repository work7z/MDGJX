// Date: Wed, 20 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"laftools-go/core/global"
	"path"
	"testing"

	"github.com/dablelv/cyan/file"
)

func TestStaticNonProhibitedAccessible(t *testing.T) {
	filesList := []string{
		"menu.json",
	}

	for i := range filesList {
		exist, err := file.IsExist(path.Join(global.GetResourceNonProhibitedDir(), filesList[i]))
		if err != nil {
			t.Error(err)
			return
		}
		if !exist {
			t.Error("file not found under " + global.GetResourceNonProhibitedDir())
		}
	}
}
