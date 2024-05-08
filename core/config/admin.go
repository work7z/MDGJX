// Date: Sun, 8 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package config

import (
	"laftools-go/core/global"
	"laftools-go/core/project/sysmodel"
	"laftools-go/core/tools"
)

func SaveCurrentSystemInfo(systemInfo *sysmodel.SystemInfo) {
	str, err := global.ToJSONStr(systemInfo)
	tools.ShouldNoErr(err, "system info is not valid")
	_ = global.WriteIntoFileAtomic(GetCurrentSystemInfoFile(), str)
}
