// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"encoding/json"
	"errors"
	"laftools-go/core/handlers/context"
	"laftools-go/core/log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AnyIsFalse(arr ...bool) bool {
	for _, b := range arr {
		if !b {
			return true
		}
	}
	return false
}
func IncompleteParam(wc context.WebContext) {
	HasErrorS(wc, wc.Dot("1719", "Incomplete request parameter"))
}
func HasErrorS(wc context.WebContext, e string) bool {
	return HasError(wc, errors.New(e))
}
func HasError(wc context.WebContext, e error) bool {
	if e != nil {
		ErrLa(wc.GinContext, e)
		return true
	} else {
		return false
	}
}

type GoResponseType = map[string]any

func DoValueRes(anyItem interface{}) GoResponseType {
	return gin.H{
		"value": anyItem,
	}
}

func DoListRes(anyItem interface{}) GoResponseType {
	return gin.H{
		"list": anyItem,
	}
}

func DoValueResForWS(statusCode int, typeStr string, anyItem interface{}) GoResponseType {
	return gin.H{
		"type":   typeStr,
		"status": statusCode,
		"value":  anyItem,
	}
}

type CodeGenJSON struct {
	Data any
	c    *gin.Context
}

var jsonContentType = []string{"application/json; charset=utf-8"}

// Render (JSON) writes data with custom ContentType.
func (r CodeGenJSON) Render(w http.ResponseWriter) error {
	return writeJSON(r, w, r.Data)
}

// WriteJSON marshals the given interface object and writes it with custom ContentType.
func writeJSON(r CodeGenJSON, w http.ResponseWriter, obj any) error {
	writeContentType(w, jsonContentType)
	jsonBytes, err := json.Marshal(obj)
	if err != nil {
		return err
	}
	_, err = w.Write(jsonBytes)
	return err
}

func writeContentType(w http.ResponseWriter, value []string) {
	header := w.Header()
	if val := header["Content-Type"]; len(val) == 0 {
		header["Content-Type"] = value
	}
}
func (r CodeGenJSON) WriteContentType(w http.ResponseWriter) {
	writeContentType(w, jsonContentType)
}

const ST_ERROR = http.StatusBadRequest

func OKLa(c *gin.Context, obj GoResponseType) {
	if len(c.Errors) == 0 {
		c.Render(http.StatusOK, CodeGenJSON{Data: gin.H{
			"payload": obj,
		}, c: c})
	} else {
		log.Ref().Warn("Received an error while doing OKLa", c.Errors)
	}
}
func OKLa2(c *gin.Context, obj interface{}) {
	if len(c.Errors) == 0 {
		c.Render(http.StatusOK, CodeGenJSON{Data: gin.H{
			"payload": obj,
		}, c: c})
	} else {
		log.Ref().Warn("Received an error while doing OKLa2", c.Errors)
	}
}

func ErrLa(c *gin.Context, obj error) {
	c.Error(obj)
	c.AbortWithStatusJSON(200, gin.H{
		"errors": []string{
			obj.Error(),
		},
	})
}

func ErrLa2(c *gin.Context, str string) {
	ErrLa(c, errors.New(str))
}
