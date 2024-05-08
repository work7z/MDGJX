// Date: Thu, 12 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package ext

import (
	"laftools-go/core/handlers/context"
	"laftools-go/core/project/base/form"
	"laftools-go/core/project/tools"
	"testing"
)

func TestFuncMapForEachExtVM(t *testing.T) {
	ctx := context.WebContext{}
	// allExtVM := GetAllExtVM(&ctx)
	// check the FuncMap output
	allMap := tools.GetAllFunctionMap(&ctx)

	for funcName, funcValue := range allMap {
		res := funcValue.ConvertText(form.ValueReq{
			InputText: "test, this is testing 中文",
		})
		if res.Err != nil {
			t.Error(res.Err)
		}
		t.Log("[NORMAL] funcName", funcName)
	}
}
