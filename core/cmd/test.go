// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package cmd

import (
	"github.com/fatih/color"
	"github.com/spf13/cobra"
)

var runTestCmd = &cobra.Command{
	Use:   "test",
	Short: "run test",
	Run: func(cmd *cobra.Command, args []string) {
		// Create a new color object
		c := color.New(color.FgCyan).Add(color.Underline)
		c.Println("LafTools")

		// Or just add them to New()
		d := color.New(color.FgCyan, color.Bold)
		d.Printf("Do what you wanna do, %s\n", "it's cool!.")

	},
}
