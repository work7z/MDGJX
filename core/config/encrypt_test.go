// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package config

import "testing"

func TestEncryptUserPassword(t *testing.T) {
	type args struct {
		str string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
		{name: "t1", args: struct{ str string }{str: "pw12345"}, want: "99cf98843a982091a24b1add966d378b"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := EncryptUserPassword(tt.args.str); got != tt.want {
				t.Errorf("EncryptUserPassword() = %v, want %v", got, tt.want)
			}
		})
	}
}
