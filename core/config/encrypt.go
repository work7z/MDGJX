// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package config

import "github.com/dablelv/cyan/crypto"

func EncryptUserPassword(str string) string {
	return crypto.Md5("PW_" + str + "_AFF")
}
