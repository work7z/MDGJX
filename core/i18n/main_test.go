// Date: Fri, 22 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package translation

import "testing"

// SKIP_DOT

func ValidateAllMissedLanguage() {
	//
}

func TestDot(t *testing.T) {
	type args struct {
		id   string
		enUS string
		arg  []interface{}
	}
	t.Log("value:  ", TraSystemOnly().Dot("m0106", "Converter"))
	tests := []struct {
		name string
		lang string
		args args
		want string
	}{
		{
			name: "test normal case",
			lang: LANG_ZH_CN,
			args: args{
				id:   "m0106",
				enUS: "Converter",
				arg:  nil,
			},
			want: "转换工具",
		},
		{
			name: "test zhHK case",
			lang: LANG_ZH_HK,
			args: args{
				id:   "m0106",
				enUS: "Converter",
				arg:  nil,
			},
			want: "轉換工具",
		},
		{
			name: "test normal case 3",
			lang: LANG_EN_US,
			args: args{
				id:   "m0106",
				enUS: "Converter",
				arg:  nil,
			},
			want: "Converter",
		},
		{
			name: "test normal case 4",
			lang: LANG_ZH_CN,
			args: args{
				id:   "m10344",
				enUS: "Test Example like {0}",
				arg:  []interface{}{"CodeGen"},
			},
			want: "测试示例如 CodeGen",
		},
		// TODO: add more test cases here
		//{
		//	name: "test replacement case",
		//	args: args{
		//		id:   "hello_world_its_content",
		//		enUS: "hello {0}, it''s content.",
		//		arg: []interface{}{
		//			"ok",
		//		},
		//	},
		//	want: "hello ok, it's content.",
		//},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			b := TraSystemOnly()
			b.lang = tt.lang
			result := b.Dot(tt.args.id, tt.args.enUS, tt.args.arg...)
			if got := result; got != tt.want {
				t.Errorf("Dot() = %v, want %v", got, tt.want)
			}
		})
	}
}
