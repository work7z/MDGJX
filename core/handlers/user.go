// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"errors"
	"laftools-go/core/config"
	"laftools-go/core/global"
	"laftools-go/core/handlers/context"
	"laftools-go/core/log"
	"laftools-go/core/project/sysmodel"
	"laftools-go/core/project/syspath"
	"laftools-go/core/tools"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

type CalcPasswordForm struct {
	Pw string `json:"pw" binding:"required"`
}

func calcPassword(c *gin.Context) {
	form := CalcPasswordForm{}
	err := c.BindJSON(&form)
	wc := context.NewWC(c)
	if HasError(wc, err) {
		return
	}
	pw := form.Pw
	log.Ref().Debug("pw is " + pw)
	OKLa(c, DoValueRes(gin.H{
		"CalcPW": config.EncryptUserPassword(pw),
	}))
}

type VerifyUserServletForm struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Token    string `json:"token"`
}

func verifyUserServlet(c *gin.Context) {
	wc := context.WebContext{GinContext: c}
	form := &VerifyUserServletForm{}
	e := c.BindJSON(&form)
	if lo.IsEmpty(form.Username) {
		ErrLa2(c, wc.Dot("2144", "Username is required"))
		return
	}
	form.Username = strings.TrimSpace(form.Username)
	form.Password = strings.TrimSpace(form.Password)
	if HasError(wc, e) {
		return
	}
	userConfig, err := syspath.GetUserConfigFromFile()
	if HasError(wc, err) {
		return
	}
	// submit local account and local user
	submittedUsername := form.Username
	submittedPassword := form.Password
	pw_f := !lo.IsEmpty(submittedPassword)
	submittedToken := form.Token
	t_f := !lo.IsEmpty(submittedToken)
	if !pw_f && !t_f {
		HasErrorS(wc, wc.Dot("1604", "Unable to detect any auth value"))
	}
	obj, found := config.GetItemByUserName(userConfig, submittedUsername)

	if !found {
		HasError(wc, errors.New(wc.Dot("1600", "Account Not Found")))
		return
	}
	if pw_f {
		checkPw := config.EncryptUserPassword(submittedPassword)
		if checkPw != config.GetUserPassword(obj) {
			HasErrorS(wc, wc.Dot("1603", "Password Does Not Match"))
			return
		}
	} else if t_f {
		if submittedToken != obj.Token {
			HasErrorS(wc, wc.Dot("1605", "Token Does Not Match."))
			return
		}
	}
	OKLa(wc.GinContext, DoValueRes(gin.H{
		"token": obj.Token,
	}))
}

// func GetForgeByUserId(c *gin.Context) {
// 	wc := context.WebContext{C: c}
// 	userId := wc.GetUserID()
// 	str, err := config.ReadUserForgeFromFile(userId)
// 	if HasError(wc, err) {
// 		return
// 	}
// 	OKLa(c, DoValueRes(gin.H{
// 		"ForgeState": str,
// 	}))
// }

func getAnyKeyByUserId(c *gin.Context) {
	wc := context.WebContext{GinContext: c}
	userId := wc.GetUserID()
	key := c.Query("key")
	str, err := syspath.ReadUserAnyKeyFromFile(userId, key)
	if HasError(wc, err) {
		return
	}
	OKLa(c, DoValueRes(gin.H{
		"StateStr": str,
	}))
}

type SetForgeByUserIdForm struct {
	StateStr string
}

func setAnyKeyByUserId(c *gin.Context) {
	wc := context.WebContext{GinContext: c}
	key := c.Query("key")
	userId := wc.GetUserID()
	form := &SetForgeByUserIdForm{}
	c.BindJSON(&form)
	fs, fs_f := form.StateStr, lo.IsNotEmpty(form.StateStr)
	if !fs_f {
		IncompleteParam(wc)
		return
	}
	if userId == "" {
		ErrLa2(c, "No available user id")
		return
	}
	err := config.WriteUserAnyKeyFromFile(userId, key, fs)
	if HasError(wc, err) {
		return
	}
	// iterate value from GetWSMarkListByTokenId(c), and send message to all
	markList := GetWSMarkListByTokenId(c)
	for _, v := range markList {
		v.wsConn.WriteJSON(DoValueResForWS(200, "FORGE_STATE_UPDATE", gin.H{
			"ack": 1,
		}))
	}
	OKLa(c, DoValueRes(1))
}

type CreateNewAccounttForm struct {
	Username       string `json:"username"`
	Password       string `json:"password"`
	Token          string `json:"token"`
	InvitationCode string `json:"invitationCode"`
}

func createNewAccount(c *gin.Context) {
	wc := context.WebContext{GinContext: c}
	form := &CreateNewAccounttForm{}
	c.BindJSON(&form)
	if lo.IsEmpty(form.Username) {
		ErrLa2(c, wc.Dot("0356", "Username is required"))
		return
	}
	form.Username = strings.TrimSpace(form.Username)
	form.Password = strings.TrimSpace(form.Password)
	u1 := form.Username
	p1 := form.Password
	uf1 := lo.IsNotEmpty(u1)
	pf1 := lo.IsNotEmpty(p1)
	InvitationCode := form.InvitationCode
	InvitationCode_f := lo.IsNotEmpty(InvitationCode)
	if !uf1 || !pf1 || !InvitationCode_f {
		IncompleteParam(wc)
		return
	}
	anyAck := false
	userConfigMap, err := syspath.GetUserConfigFromFile()
	if err != nil {
		HasError(wc, err)
		return
	}
	if FN_verifyUserStatus(userConfigMap, u1, wc) {
		return
	}
	for _, userConfig := range userConfigMap {
		if userConfig.IsAdmin {
			if userConfig.InvitationCode != "" && userConfig.InvitationCode == InvitationCode {
				anyAck = true
			}
		}
	}
	if !anyAck {
		HasErrorS(wc, wc.Dot("1722", "The token for creating new user is incorrect"))
		return
	} else {
		userConfig := sysmodel.UserConfig{
			Id:             global.UUID(),
			Username:       u1,
			Password:       config.EncryptUserPassword(p1),
			Token:          global.UUID(),
			CreateTime:     time.Now(),
			IsAdmin:        false,
			InvitationCode: "",
		}
		userConfigMap[userConfig.Id] = userConfig
		err := syspath.SetUserConfigIntoFile(userConfigMap)
		if HasError(wc, err) {
			return
		}
		OKLa(c, DoValueRes(userConfigMap))
	}
}

func FN_verifyUserStatus(userConfigMap map[string]sysmodel.UserConfig, u1 string, wc context.WebContext) bool {
	_, foundPrev := config.GetItemByUserName(userConfigMap, u1)
	if foundPrev {
		HasErrorS(wc, wc.Dot("1753", "Username is already used in system."))
		return true
	}
	return false
}

type ResetPasswordByOldPasswordForm struct {
	Username    string
	Password    string
	NewPassword string
}

func resetPasswordByOldPassword(c *gin.Context) {
	wc := context.NewWC(c)
	form := &ResetPasswordByOldPasswordForm{}
	c.BindJSON(&form)
	u, u_f := tools.CheckStr(form.Username)
	p, p_f := tools.CheckStr(form.Password)
	np, np_f := tools.CheckStr(form.NewPassword)
	if AnyIsFalse(u_f, p_f, np_f) {
		IncompleteParam(wc)
		return
	}
	userConfigMap, err := syspath.GetUserConfigFromFile()
	if HasError(wc, err) {
		return
	}
	obj, foundPrev := config.GetItemByUserName(userConfigMap, u)
	if foundPrev {
		HasErrorS(wc, wc.Dot("1758", "Username is already used in system."))
		return
	}
	p = config.EncryptUserPassword(p)
	np = config.EncryptUserPassword(np)
	if config.GetUserPassword(obj) != p {
		HasErrorS(wc, wc.Dot("1756", "Password does not match."))
		return
	}
	obj.Password = np
	err2 := syspath.SetUserConfigIntoFile(userConfigMap)
	if HasError(wc, err2) {
		return
	}
	os.Remove(config.GetUserPasswordPatchFile(*obj))
	OKLa(wc.GinContext, DoValueRes("this is get user token"))
}
