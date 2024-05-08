// Date: Sun, 5 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package context

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// create a gin server, and simulate being called in a API
func TestWebContext(t *testing.T) {
	// define an arrya for
	var arr []string = make([]string, 3)
	// add en_US, zh_CN, zh_HK into arr
	arr[0] = "en_US"
	arr[1] = "zh_CN"
	arr[2] = "zh_HK"

	for _, lang := range arr {
		assert.NotEmpty(t, lang)
		t.Log("loop lang is ", lang)
		gin.SetMode(gin.TestMode)
		r := gin.Default()
		var performRequest = func(r http.Handler, method, path string) *httptest.ResponseRecorder {
			req, _ := http.NewRequest(method, path, nil)
			req.Header.Add("X-LOCAL-USER-LANG", lang)
			req.Header.Add("X-LOCAL-PAGE-ID", "12345")
			req.Header.Add("Content-Type", "application/json")
			w := httptest.NewRecorder()
			r.ServeHTTP(w, req)
			return w
		}
		r.GET("/ping", func(c *gin.Context) {
			wc := NewWC(c)
			t.Log("wc is ", wc)
			t.Log("user lang is ", wc.GetUserLanguage())
			before_str := wc.Dot("iL4_qM", "Wild Women (Don't Have the Blues)")
			fmt.Println("first string is " + before_str)
			configJSON, err := wc.ToConfigJSON()
			assert.NoError(t, err)
			t.Log("configJSON is ", configJSON)

			obj, err2 := NewWCFromJSON(configJSON)
			assert.NoError(t, err2)
			afterStr := obj.Dot("6ouVD", "Wild Women (Don't Have the Blues)")
			assert.Equal(t, before_str, afterStr)
			if lang == "zh_CN" {
				assert.Equal(t, "狂野的女人（不要忧郁）", afterStr)
			} else if lang == "zh_HK" {
				assert.Equal(t, "狂野的女人（不要憂鬱）", afterStr)
			} else {
				assert.Equal(t, "Wild Women (Don't Have the Blues)", afterStr)
			}
			c.JSON(200, gin.H{
				"message": "pong",
			})
		})

		w := performRequest(r, "GET", "/ping")

		assert.Equal(t, http.StatusOK, w.Code)

	}

}
