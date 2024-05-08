// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package global

import (
	"laftools-go/core/tools"
	"os"
	"path"
)

func GetUserHomeDir() string {
	a, err := os.UserHomeDir()
	tools.ShouldNoErr(err, "user home dir is empty")
	e := tools.JoinWithMkdir(a)
	tools.ShouldNoErr(e, "config file is not foundable")
	return a
}

func GetAppHomeConfigDirectory() string {
	return tools.MkdirDirWithStr(path.Join(GetAppHomeDirectory(), "config"))
}
func GetAppHomeTempDirectory() string {
	return tools.MkdirDirWithStr(path.Join(GetAppHomeDirectory(), "temp"))
}

func getProjectNameAffix() string {
	// UAT, DEV, PROD("")
	if tools.IsDevMode {
		return "L-DEV"
	}
	if tools.IsUATMode {
		return "L-UAT"
	}
	return ""
}

func GetAppHomeDirName() string {
	return ".laf" + getProjectNameAffix() + "-tools-home"
}

func GetDefaultAppConfigDir() string {
	var homeDir, _ = os.UserHomeDir()
	var DefaultAppConfigDir = path.Join(homeDir, GetAppHomeDirName())
	return DefaultAppConfigDir
}
func GetAppDataDirName() string {
	return getProjectNameAffix() + "LafTools"
}

func GetAppHomeDirectory() string {
	pathname := path.Join(GetUserHomeDir(), GetAppHomeDirName())
	e := tools.MkdirDir(pathname)
	tools.ShouldNoErr(e, "~/"+GetAppHomeDirName()+" cannot be created")
	return pathname
}
func GetAppDataDirectory() string {
	pathname := path.Join(GetUserHomeDir(), GetAppDataDirName())
	e := tools.MkdirDir(pathname)
	tools.ShouldNoErr(e, "~/"+GetAppDataDirName()+" cannot be created")
	return pathname
}
