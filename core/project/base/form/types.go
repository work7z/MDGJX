// Date: Mon, 18 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package form

import translation "laftools-go/core/i18n"

type ExtraConfig = map[string]string

type TextRequest struct {
	UsingInputText bool
	UsingInputFile bool
	InputCharset   string
	OutputCharset  string
	InputText      string
	InputFile      string // file path
	ExtraConfigMap *ExtraConfig
}

type LabelProp struct {
	Label        string
	Prop         string
	DefaultValue interface{}
}
type PropWithDefaultValue struct {
	Prop         string
	DefaultValue interface{}
}

type Element struct {
	Id           string
	Icon         string
	DefaultValue string
	PlaceHolder  string
	HelperText   string
}

type TextField struct {
	Element
	Type         string // text, number, date, etc...
	IsTextArea   bool
	rightElement *Element
}

type FileSelector struct {
	Element
}

type Select struct {
	StaticList     []LabelProp
	GetDynamicList func() []LabelProp // if this field is available, then use this firstly
}

type ExtensionInfoForWeb struct {
	Id          string
	Label       string
	Description string
}

type ExtensionInfo struct {
	Id                string
	Label             translation.TranslatePassArg
	LabelByInit       string
	Description       translation.TranslatePassArg
	DescriptionByInit string
}
type ValueReq struct {
	InputText      string
	InputFile      string // if it's not empty, then it means user specified a file to process
	ExtraConfigMap map[string]string
	ReturnAsFile   bool // by default false
}
type ValueRes struct {
	Err        error
	OutputText string
	OutputFile string
}
type ValueHandler struct {
	ConvertText func(ValueReq) ValueRes
	ConvertFile func(ValueReq) ValueRes
}

type ExtensionFuncMap = map[string]*ValueHandler

type FormModel = map[string]any

type ExtensionAction struct {
	Tooltip       translation.TranslatePassArg
	TooltipByInit string
	Id            string
	Label         translation.TranslatePassArg
	LabelByInit   string
	CallFuncList  []string
}

type ExtensionVM struct {
	Layout           string
	InitialFormModel *FormModel
	Info             *ExtensionInfo
	Actions          *[]*ExtensionAction
}
