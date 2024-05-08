// Date: Sun, 8 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"laftools-go/core/config"
	"laftools-go/core/global"
	"laftools-go/core/handlers/context"
	"laftools-go/core/project/base/ext"
	"laftools-go/core/project/sysmodel"
	"laftools-go/core/project/syspath"
	"laftools-go/core/tools"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func getInitInfoSystem(c *gin.Context) {
	OKLa(c, DoValueRes(gin.H{
		"UserConfigFile": syspath.GetUserConfigFile(),
		"UserConfigDir":  syspath.GetUserConfigDir(),
		"UserPWDir":      syspath.GetUserPWDir(),
	}))
}

type ResFoundByToken struct {
	Obj   *sysmodel.UserConfig
	Found bool
	Msg   string
}

func getUsernameAsResult(c *gin.Context) {
	a, _ := syspath.GetUserConfigFromFile()
	usernames := []string{}
	for _, uc := range a {
		usernames = append(usernames, uc.Username)
	}
	OKLa(c, DoValueRes(gin.H{
		"Usernames": usernames,
	}))
}

func visitGetByToken(c *gin.Context) {
	token := strings.TrimSpace(c.Query("userToken"))
	if token == "" {
		OKLa(c, DoValueRes(ResFoundByToken{
			Msg:   "token is empty",
			Obj:   nil,
			Found: false,
		}))
		return
	}
	a, _ := syspath.GetUserConfigFromFile()
	item, item_f := config.GetUserItemByToken(a, token)
	if item_f {
		OKLa(c, DoValueRes(ResFoundByToken{
			Obj:   item,
			Found: true,
			Msg:   "item found",
		}))
	} else {
		OKLa(c, DoValueRes(ResFoundByToken{
			Obj:   nil,
			Found: false,
			Msg:   "item not found",
		}))
	}
}

func getAdminInitStatus(c *gin.Context) {
	a, _ := syspath.GetUserConfigFromFile()
	anyAdmin := false
	if a != nil {
		for _, userConfig := range a {
			if userConfig.IsAdmin {
				anyAdmin = true
			}
		}
	}
	OKLa(c, DoValueRes(gin.H{
		"HasAdminInit":    anyAdmin,
		"LastUpdatedTime": time.Now(),
	}))
}

type CreateAdminInitStatusForm struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func createAdminInitStatus(c *gin.Context) {
	wc := context.NewWC(c)
	form := &CreateAdminInitStatusForm{}
	_ = c.BindJSON(form)
	if "" == (form.Username) || "" == (form.Password) {
		IncompleteParam(wc)
		return
	}
	s_adminToken := config.GetAdminInitToken()
	u_adminToken := c.GetHeader(tools.HEADER_ADMIN_TOKEN)
	if u_adminToken != s_adminToken {
		ErrLa2(c, wc.Dot("2157", "Admin Token is required, please use valid initialization URL to starts with."))
		return
	}
	userConfigMap, e2 := syspath.GetUserConfigFromFile()
	if e2 != nil {
		ErrLa(c, e2)
		return
	}
	e := FN_verifyUserStatus(userConfigMap, form.Username, wc)
	if e {
		return
	}
	// THIS LOGIC need to align with the logic in server.go
	userConfig := sysmodel.UserConfig{
		Id:             global.UUID(),
		Username:       form.Username,
		Password:       config.EncryptUserPassword(form.Password),
		Token:          global.UUID(),
		CreateTime:     time.Now(),
		IsAdmin:        true,
		InvitationCode: global.UUID(),
	}
	userConfigMap[userConfig.Id] = userConfig
	err := syspath.SetUserConfigIntoFile(userConfigMap)
	if HasError(wc, err) {
		return
	}
	// update system info
	systemInfo := config.GetCurrentSystemInfo()
	systemInfo.HasAdminInit = true
	config.SaveCurrentSystemInfo(systemInfo)
	OKLa(c, DoValueRes(userConfigMap))
}

// Provide an API that randomly pick one string from GetMottoList(), and call OKLa return it by DoValueRes
func getMotto(c *gin.Context) {
	wc := context.NewWC(c)
	list := ext.GetMottoList(&wc)
	pickOne := global.RandomPickOneFromList(list)
	OKLa(c, DoValueRes(pickOne()))
}
