// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package cmd

import (
	"laftools-go/core/project/base/extra"

	"github.com/spf13/cobra"
)

var devExtraCmd = &cobra.Command{
	Use:   "dev-extra",
	Short: "Run dev extra stuff",
	Run: func(cmd *cobra.Command, args []string) {
		extra.HandleExtraAction(cmd, args)
	},
}
