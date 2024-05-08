// Date: Tue, 19 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"laftools-go/core/handlers/context"
	"laftools-go/core/project/base/ext"
	"laftools-go/core/project/base/form"
	"strings"

	"github.com/gin-gonic/gin"
)

// write a function GetExtDetail for retrieving the detail of an extension by extId query
type DocallActionFuncListForm struct {
	ActionId  string
	InputText string
}

func doActionForConvertingText(c *gin.Context) {
	crt_form := &DocallActionFuncListForm{}
	c.BindJSON(&crt_form)
	wc := context.NewWC(c)
	actionId := crt_form.ActionId
	actionItem, err := extraConvertAction(wc, actionId)
	if err != nil {
		ErrLa(c, err)
		return
	} else {
		funcMap := ext.GetAllFuncMapIntoOneMapWithKeyValuePair(&wc)
		ipt := crt_form.InputText
		crtFuncList := actionItem.CallFuncList
		// iterate crtFuncList, and split each item by ".", and call funcMap[item].ConvertText(form.ValueReq{})
		for _, item := range crtFuncList {
			// split by "."
			splitted := strings.Split(item, ".")
			// call funcMap[item].ConvertText(form.ValueReq{})
			crtValueRes := funcMap[splitted[0]].ConvertText(form.ValueReq{
				InputText: ipt,
			})
			if crtValueRes.Err != nil {
				ErrLa(c, crtValueRes.Err)
				return
			}
			ipt = crtValueRes.OutputText
		}
		OKLa(c, DoValueRes(gin.H{
			"OutputText": ipt,
		}))
	}
}

func extraConvertAction(wc context.WebContext, actionId string) (*form.ExtensionAction, error) {
	// allExtActionsMap := ext.GetAllExtActionsWithKeyValuePair(&wc)
	// // find item in allExtActions
	// item, found := allExtActionsMap[actionId]
	// if !found {
	// 	return nil, errors.New(wc.Dot("KqTYC", "Action Not Found"))
	// } else {
	// 	return &item, nil
	// }
	return nil, nil
}

// write a function getOneExtUnderSpecificCategory for retrieving the detail of an extension by extId query
func getOneExtUnderSpecificCategory(c *gin.Context) {
	extId := c.Query("extId")
	wc := context.WebContext{GinContext: c}
	if extId == "" {
		ErrLa2(c, wc.Dot("eIXF4", "Extension ID is required"))
		return
	}
	item, err2 := ext.GetExtById(&wc, extId)
	if err2 != nil {
		ErrLa(c, err2)
		return
	}
	OKLa(c, DoValueRes(item))
}

func listCategory(c *gin.Context) {
	wc := context.WebContext{GinContext: c}
	b, e := ext.GetAllCategory(&wc)
	if e != nil {
		ErrLa(c, e)
		return
	}
	OKLa(c, DoListRes(b))
}

func listSubCategory(c *gin.Context) {
	categoryId := c.Query("categoryId")
	wc := context.WebContext{GinContext: c}
	if categoryId == "" {
		ErrLa2(c, wc.Dot("1322", "Category ID is required"))
		return
	}
	allCategory, err := ext.GetAllCategory(&wc)
	if err != nil {
		ErrLa(c, err)
		return
	}
	if err != nil {
		ErrLa(c, err)
		return
	}
	isAll := categoryId == "all"
	filteredArr := make([]ext.ListExtForTheCategoryRes, 0)
	for _, cate := range allCategory {
		if isAll || cate.Id == categoryId {
			// collect item.Children.Info as an array, and assign it to Info
			for _, subCate := range cate.SubCategories {
				c := make([]form.ExtensionInfoForWeb, 0)
				for _, tcsbi := range subCate.ChildrenSetByInit {
					c = append(c, form.ExtensionInfoForWeb{
						Id:    tcsbi.Id,
						Label: tcsbi.LabelByInit,
						// Description: tcsbi.DescriptionByInit,
					})
				}
				filteredArr = append(filteredArr, ext.ListExtForTheCategoryRes{
					Id:             subCate.Id,
					Label:          subCate.LabelByInit,
					Icon:           subCate.Icon,
					CategoryId:     cate.Id,
					ChildrenAsInfo: c,
				})

			}
		}
	}
	OKLa(c, DoListRes(filteredArr))
}
