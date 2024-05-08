// Date: Mon, 18 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"encoding/json"
	"laftools-go/core/global"
	"laftools-go/core/handlers/context"
	"laftools-go/core/tools"
	"path"

	"github.com/gin-gonic/gin"
)

type AppI18nRaw struct {
	Label          []string
	Value          string
	LabelInEnglish string
	LabelByLang    string
}

type AppI18nFormatted struct {
	AppI18nRaw
	Label          string
	LabelInEnglish string
	LabelByLang    string
	Value          string
}

func getI18NLang(c *gin.Context) {

	var indexJSONFile = path.Join(global.GetPureJSFolder(), "app-i18n.json")
	returnValue := []AppI18nRaw{}
	// read file and unmarhsla it to returnValue
	b, er := tools.ReadFileAsStrWithNoTrim(indexJSONFile)
	if er != nil {
		ErrLa(c, er)
		return
	}
	er = json.Unmarshal([]byte(b), &returnValue)
	if er != nil {
		ErrLa(c, er)
		return
	}
	formattedReturnValue := []AppI18nFormatted{}
	wc := context.NewWC(c)
	// format returnValue to formattedReturnValue
	for _, v := range returnValue {
		formattedReturnValue = append(formattedReturnValue, AppI18nFormatted{
			Label:          wc.Dot(v.Label[0], v.Label[1]),
			Value:          v.Value,
			LabelInEnglish: v.LabelInEnglish,
			LabelByLang:    v.LabelByLang,
		})
	}
	OKLa(c, DoValueRes(formattedReturnValue))
}
