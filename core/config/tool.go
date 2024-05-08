// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package config

import (
	"encoding/json"
	"laftools-go/core/log"
	"laftools-go/core/project/sysmodel"
	"laftools-go/core/project/syspath"
	"laftools-go/core/tools"
	"path"
	"strings"
)

func GetUserPassword(userConfig *sysmodel.UserConfig) string {
	pwFile := GetUserPasswordPatchFile(*userConfig)
	log.Ref().Debug("check pw file : ", pwFile)
	if tools.IsFileNonExist(pwFile) {
		log.Ref().Debug("return from password: " + userConfig.Password)
		return userConfig.Password
	} else {
		s, err := tools.ReadFileAsStr(pwFile)
		s = strings.TrimSpace(s)
		if err != nil || strings.TrimSpace(s) == "" {
			log.Ref().Debug("return from password, not from s ", s)
			return userConfig.Password
		} else {
			log.Ref().Debug("return from password file: ", s)
			return s
		}
	}
}
func GetUserPasswordPatchFile(userConfig sysmodel.UserConfig) string {
	return path.Join(syspath.GetUserPWDir(), userConfig.Username+".txt")
}

func GetItemByUserName(userConfig sysmodel.UserConfigMap, submittedUsername string) (*sysmodel.UserConfig, bool) {
	for _, config := range userConfig {
		if config.Username == submittedUsername {
			return &config, true
		}
	}
	return nil, false
}

func GetItemByTokenDirectly(token string) (*sysmodel.UserConfig, bool) {
	userConfig, e := syspath.GetUserConfigFromFile()
	if e != nil {
		return nil, false
	}
	for _, config := range userConfig {
		if config.Token == token {
			return &config, true
		}
	}
	return nil, false
}

func GetUserItemByToken(userConfig sysmodel.UserConfigMap, token string) (*sysmodel.UserConfig, bool) {
	for _, config := range userConfig {
		if config.Token == token {
			return &config, true
		}
	}
	return nil, false
}

func WriteUserAnyKeyFromFile(userId string, key string, item_str string) error {
	file := syspath.GetUserAnyKeyFile(userId, key)
	var item interface{}
	err := json.Unmarshal([]byte(item_str), &item)
	if err != nil {
		return err
	}
	err2 := tools.WriteObjectIntoFileWithMergeChecking(file, item)
	if err2 != nil {
		return err2
	}
	return nil
}
