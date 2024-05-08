// Date: Fri, 13 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package ext

import (
	"encoding/json"
	"laftools-go/core/global"
	"laftools-go/core/handlers/context"
	translation "laftools-go/core/i18n"
	"laftools-go/core/log"
	"laftools-go/core/project/base/form"
	"laftools-go/core/project/tools"
	gtools "laftools-go/core/tools"
	"path"
	"strconv"
)

type SubExtCategory struct {
	CategoryId string
	Id         string
	Label      string
	Icon       string
	Children   []form.ExtensionVM
}

type ToolChildrenSetByInit struct {
	Id                string
	Label             translation.TranslatePassArg
	LabelByInit       string
	Description       translation.TranslatePassArg
	DescriptionByInit string
}

type ToolCategory struct {
	Id            string
	TotalCount    int
	Label         translation.TranslatePassArg
	LabelByInit   string
	SubCategories []*ToolSubCategory
}

type ListExtForTheCategoryRes struct {
	CategoryId     string
	Id             string
	Label          string
	Icon           string
	ChildrenAsInfo []form.ExtensionInfoForWeb
}

type ToolSubCategory struct {
	Id                string
	Label             translation.TranslatePassArg
	LabelByInit       string
	Icon              string
	ChildrenSetByInit []*ToolChildrenSetByInit
}

func GetExtById(wc *context.WebContext, extId string) (*form.ExtensionVM, error) {
	var indexJSONFile = path.Join(global.GetPureJSFolder(), "exts", extId, "index.json")
	returnValue := &form.ExtensionVM{}
	// read file and unmarhsla it to returnValue
	b, er := gtools.ReadFileAsStrWithNoTrim(indexJSONFile)
	if er != nil {
		return nil, er
	}
	er = json.Unmarshal([]byte(b), returnValue)
	if er != nil {
		return nil, er
	}
	// make Label as LabelByInit for returnValue
	returnValue.Info.LabelByInit = wc.DotWithoutScan(returnValue.Info.Label...)
	returnValue.Info.Label = nil

	returnValue.Info.DescriptionByInit = wc.DotWithoutScan(returnValue.Info.Description...)
	returnValue.Info.Description = nil

	// TODO: enhance those ByInit logic with smarter logic

	// also handle for returnValue.Actions
	for _, raction := range *returnValue.Actions {
		action := raction
		action.LabelByInit = wc.DotWithoutScan(action.Label...)
		action.Label = nil

		action.TooltipByInit = wc.DotWithoutScan(action.Tooltip...)
		action.Tooltip = nil
	}

	return returnValue, nil
}

func GetAllCategory(wc *context.WebContext) ([]*ToolCategory, error) {

	var categoryFile = path.Join(global.GetPureJSFolder(), "category.json")
	var returnValue []*ToolCategory = []*ToolCategory{}
	// read file and unmarhsla it to returnValue
	b, er := gtools.ReadFileAsStrWithNoTrim(categoryFile)
	if er != nil {
		return nil, er
	}
	er = json.Unmarshal([]byte(b), &returnValue)
	if er != nil {
		return nil, er
	}
	// for each returnValue, translate its value into LabelByInit
	for _, category := range returnValue {
		category.LabelByInit = wc.DotWithoutScan(category.Label...) + "(" + strconv.Itoa(category.TotalCount) + ")"
		category.Label = nil
		for _, subCategory := range category.SubCategories {
			subCategory.LabelByInit = wc.DotWithoutScan(subCategory.Label...)
			subCategory.Label = nil
			for _, childrenSetByInit := range subCategory.ChildrenSetByInit {
				childrenSetByInit.LabelByInit = wc.DotWithoutScan(childrenSetByInit.Label...)
				childrenSetByInit.Label = nil
				// childrenSetByInit.DescriptionByInit = wc.DotWithoutScan(childrenSetByInit.Description...)
				childrenSetByInit.DescriptionByInit = "" // wc.DotWithoutScan(childrenSetByInit.Description...)
				childrenSetByInit.Description = nil
			}
		}
	}
	return returnValue, nil
}

var Ref_AtomicInt int64 = 0

// write a function that return SubExtCategory array
func GetAllSubExtCategory(ctx *context.WebContext) ([]*ToolSubCategory, error) {
	allCategory, err := GetAllCategory(ctx)
	if err != nil {
		return nil, err
	}
	var arr []*ToolSubCategory = []*ToolSubCategory{}
	for _, category := range allCategory {
		arr = append(arr, category.SubCategories...)
	}
	return arr, nil
}

// return all form.ExtensionVM from functions whose begin with FN_
func GetAllExtVM(ctx *context.WebContext) ([]form.ExtensionVM, error) {
	// collect all children items in GetAllSubExtCategory() and add them into the same array, then return
	allExtVM := make([]form.ExtensionVM, 0)
	b, _ := GetAllSubExtCategory(ctx)
	for _, subExtCategory := range b {
		for _, extVM := range subExtCategory.ChildrenSetByInit {
			id := extVM.Id
			extVM, err := GetExtById(ctx, id)
			if err != nil {
				log.Ref().Warn("got err", err)
				return nil, err
			} else {
				allExtVM = append(allExtVM, *extVM)
			}
		}
	}
	return allExtVM, nil
}

func GetAllFuncMapIntoOneMapWithKeyValuePair(ctx *context.WebContext) map[string]*form.ValueHandler {
	allMaps := tools.GetAllFunctionMap(ctx)
	return allMaps
}

func GetAllExtActionsWithKeyValuePair(ctx *context.WebContext) (map[string]*form.ExtensionAction, error) {
	// get all Actions in GetAllExtVM, remember to recursive collect them
	allExtVM, err := GetAllExtVM(ctx)
	if err != nil {
		return nil, err
	}
	allExtActions := make(map[string]*form.ExtensionAction)
	for _, extVM := range allExtVM {
		for _, action := range *extVM.Actions {
			allExtActions[action.Id] = action
		}
	}
	return allExtActions, nil
}

func GetAllExtActions(ctx *context.WebContext) ([]*form.ExtensionAction, error) {
	// get all Actions in GetAllExtVM, remember to recursive collect them
	allExtVM, err := GetAllExtVM(ctx)
	if err != nil {
		return nil, err
	}
	allExtActions := make([]*form.ExtensionAction, 0)
	for _, extVM := range allExtVM {
		allExtActions = append(allExtActions, *extVM.Actions...)
	}
	return allExtActions, nil
}
