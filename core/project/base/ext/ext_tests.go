// Date: Sat, 25 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package ext

import (
	"laftools-go/core/handlers/context"
	translation "laftools-go/core/i18n"
	"testing"
)

// test how long will GetAllCategory take?
func Benchmark_GetAllCategory(b *testing.B) {
	wc := &context.WebContext{
		OverwriteUserLang: translation.LANG_ZH_CN,
	}
	for i := 0; i < b.N; i++ {
		_, err := GetAllCategory(wc)
		if err != nil {
			b.Error(err)
		}
	}
}

// benchmark for GetAllExtActions()
func Benchmark_GetAllExtActions(b *testing.B) {
	wc := &context.WebContext{
		OverwriteUserLang: translation.LANG_ZH_CN,
	}
	for i := 0; i < b.N; i++ {
		_, err := GetAllExtActions(wc)
		if err != nil {
			b.Error(err)
		}
	}
}
func Benchmark_GetAllExtVM(b *testing.B) {
	wc := &context.WebContext{
		OverwriteUserLang: translation.LANG_ZH_CN,
	}
	for i := 0; i < b.N; i++ {
		_, err := GetAllExtVM(wc)
		if err != nil {
			b.Error(err)
		}
	}
}
func Benchmark_GetAllExtActionsWithKeyValuePair(b *testing.B) {
	wc := &context.WebContext{
		OverwriteUserLang: translation.LANG_ZH_CN,
	}
	for i := 0; i < b.N; i++ {
		_, err := GetAllExtActionsWithKeyValuePair(wc)
		if err != nil {
			b.Error(err)
		}
	}
}

func Test_GetAllCategory(t *testing.T) {
	wc := &context.WebContext{
		OverwriteUserLang: translation.LANG_ZH_CN,
	}
	allCategory, err := GetAllCategory(wc)
	if err != nil {
		t.Errorf("error when GetAllCategory: %s", err.Error())
	}
	// check the uniq of Id
	idMap := make(map[string]bool)
	for _, category := range allCategory {
		if _, ok := idMap[category.Id]; ok {
			t.Errorf("the id %s is not uniq", category.Id)
		} else {
			idMap[category.Id] = true
		}
	}
	// check the uniq of SubCategories.Id
	subIdMap := make(map[string]bool)
	for _, category := range allCategory {
		for _, subCategory := range category.SubCategories {
			if _, ok := subIdMap[subCategory.Id]; ok {
				t.Errorf("the sub id %s is not uniq", subCategory.Id)
			} else {
				subIdMap[subCategory.Id] = true
			}
		}
	}
	// check the uniq of SubCategories.ChildrenSetByInit.Id
	subChildrenIdMap := make(map[string]bool)
	for _, category := range allCategory {
		for _, subCategory := range category.SubCategories {
			for _, subChildren := range subCategory.ChildrenSetByInit {
				if _, ok := subChildrenIdMap[subChildren.Id]; ok {
					// t.Errorf("the sub children id %s is not uniq", subChildren.Id)
				} else {
					subChildrenIdMap[subChildren.Id] = true
				}
			}
		}
	}
}
