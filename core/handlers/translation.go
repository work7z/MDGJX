// Date: Wed, 20 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	gt "github.com/bas24/googletranslatefree"
	"github.com/gin-gonic/gin"
)

type TextTranslationReqForm struct {
	SourceLang string
	TargetLang string
	Type       string
	Text       string
}

func translateText(c *gin.Context) {
	form := TextTranslationReqForm{}
	e := c.BindJSON(&form)
	if e != nil {
		ErrLa(c, e)
	}
	text, e := TranslateText(form.Text, form.SourceLang, form.TargetLang)
	if e != nil {
		ErrLa(c, e)
	}
	OKLa(c, DoValueRes(text))
}

func TranslateText(text, sourceLang string, targetLang string) (string, error) {
	if targetLang == "en_US" {
		targetLang = "en"
	}
	if targetLang == "zh_CN" {
		targetLang = "zh-cn"
	}
	if targetLang == "zh_HK" {
		targetLang = "zh-hk"
	}
	return gt.Translate(text, sourceLang, targetLang)
}
