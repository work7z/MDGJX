// Date: Mon, 25 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package tools

const LockExtension = ".lock"
const MAX_CHECK_FILE_LONG = 20 * 1000 // 20 seconds

func GetLockFile(pathname string) string {
	return pathname + LockExtension
}

func HasLockFile(pathname string) bool {
	a := GetLockFile(pathname)
	if !IsFileExist(a) {
		return false
	} else {
		// TODO: make lock file logic if neededu
		return false
	}
}
