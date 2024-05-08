// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package context

import (
	"encoding/json"
	"errors"
	translation "laftools-go/core/i18n"
	"laftools-go/core/tools"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// SKIP_DOT

type WebContext struct {
	config            *WebContextConfig
	GinContext        *gin.Context
	OverwriteUserLang string
	OverwriteUserId   string
	JsonMode          bool
}

func NewWC(c *gin.Context) WebContext {
	return WebContext{
		JsonMode:   false,
		GinContext: c,
		config: &WebContextConfig{
			HTTPHeaders: c.Request.Header,
		},
	}
}

func NewWCFromSystemDefault() (*WebContext, error) {
	b, err := NewWCFromJSON(`{"HTTPHeaders":{"` + tools.HEADER_LANGUAGE + `":["` + tools.SystemUserLanguage + `"]}}`)
	return b, err
}

func (wc *WebContext) IsJSONMode() bool {
	return wc.GinContext == nil
}

type WebContextConfig struct {
	HTTPHeaders http.Header
}

func (wc *WebContext) GetHeaderValue(key string) string {
	if wc.GinContext == nil && wc.config != nil && wc.config.HTTPHeaders != nil {
		// find key in wc.config.HTTPHeaders in case-insensitive mode
		key = strings.ToLower(key)
		for k, v := range wc.config.HTTPHeaders {
			if strings.ToLower(k) == key {
				if len(v) != 0 {
					return v[0]
				}
			}
		}
		return ""
	} else {
		return wc.GinContext.GetHeader(key)
	}
}

func (wc *WebContext) ToConfigJSON() (string, error) {
	// marshal wc as string
	c_json, err := json.Marshal(WebContextConfig{
		HTTPHeaders: wc.GinContext.Request.Header,
	})
	if err != nil {
		return "", errors.New("We encountered JSON marshal issue when creating WebContext from JSON string." + err.Error())
	}
	return string(c_json), nil
}
func NewWCFromJSON(c_json string) (*WebContext, error) {
	// unmarhsal c_json to WebContext
	var config WebContextConfig
	err := json.Unmarshal([]byte(c_json), &config)
	if err != nil {
		return nil, errors.New("We encountered JSON unmarshal issue when creating WebContext from JSON string." + err.Error())
	}
	return &WebContext{
		config:   &config,
		JsonMode: true,
	}, nil
}

func (wc *WebContext) GetUserID() string {
	if wc.OverwriteUserId != "" {
		return wc.OverwriteUserId
	}
	userId := wc.GetHeaderValue(tools.HEADER_LOCAL_USER_ID)
	if userId == "" {
		if tools.IsDevMode {
			// log.Ref().Fatal("userid is empty")
		}
	}
	return userId
}
func (wc *WebContext) GetWorkspaceID() string {
	return wc.GetHeaderValue(tools.HEADER_LOCAL_WORKSPACE_ID)
}

func (wc *WebContext) GetUserLanguage() string {
	if wc.OverwriteUserLang != "" {
		return wc.OverwriteUserLang
	}
	if wc.JsonMode && wc.config != nil {
		return wc.GetHeaderValue(tools.HEADER_LANGUAGE)
	}
	if wc.GinContext == nil {
		return tools.SystemUserLanguage
	}
	userlang := wc.GetHeaderValue(tools.HEADER_LANGUAGE)
	if userlang == "" {
		userlang = tools.SystemUserLanguage
	}
	return userlang
}

func (wc *WebContext) GetHeaderClientToken() string {
	token := strings.TrimSpace(wc.GetHeaderValue(tools.HEADER_LOCAL_USER_TOKEN))
	return token
}

func (wc *WebContext) DotWithoutScan(arg ...string) string {
	if len(arg) == 0 {
		return ""
	}
	if len(arg) == 1 {
		return arg[0]
	}
	if len(arg) <= 2 {
		return wc.Dot(arg[0], arg[1])
	} else {
		return wc.Dot(arg[0], arg[1], arg[2:])
	}
}

func (wc *WebContext) Dot(id string, enText string, arg ...interface{}) string {
	userlang := wc.GetUserLanguage()
	return translation.TraFromWeb(userlang).Dot(id, enText, arg)
}
