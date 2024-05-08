// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package cmd

import (
	"laftools-go/core/project/tools"

	"github.com/spf13/cobra"
)

var middlewareCmd = &cobra.Command{
	Use:   "fn",
	Short: "Do fn stuff",
	Long:  `To call what LafTools needs`,
	Run:   tools.RunCMD,
}
