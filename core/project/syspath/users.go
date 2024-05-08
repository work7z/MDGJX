// Date: Mon, 15 Jan 2024
// Author: Ryan Laf <work7z@outlook.com>
// Description:
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package syspath

import (
	"laftools-go/core/global"
	"laftools-go/core/handlers/context"
	"laftools-go/core/project/sysmodel"
	"laftools-go/core/tools"
	"path"
	"strings"

	"github.com/dablelv/cyan/file"
)

func GetUserConfigFile() string {
	return (path.Join(global.GetAppHomeConfigDirectory(), "users.json"))
}
func GetAppTempUploadDir() string {
	return tools.MkdirDirWithStr((path.Join(global.GetAppHomeTempDirectory(), "upload")))
}
func GetUserPWDir() string {
	a := path.Join(global.GetAppHomeConfigDirectory(), "pw")
	_ = tools.MkdirDir(a)
	return a
}

func GetUserOwnConfigFolder(wc *context.WebContext) string {
	userId := wc.GetUserID()
	return GetTargetUserOwnFolder(userId)
}
func GetUserWorkSpaceConfigFile(userId string) string {
	return GetUserAnyKeyFile(userId, "workspace-config")
}

func GetUserAnyKeyFile(userId string, key string) string {
	userMyFolder := GetTargetUserOwnFolder(userId)
	return (path.Join(userMyFolder, key+".json"))
}
func GetUserForgeFile(userId string) string {
	userMyFolder := GetTargetUserOwnFolder(userId)
	finalFolder := tools.MkdirDirWithStr(path.Join(userMyFolder, "forge"))
	return (path.Join(finalFolder, "forge.json"))
}
func GetUserConfigFromFile() (sysmodel.UserConfigMap, error) {
	userConfigFile := GetUserConfigFile()
	var res sysmodel.UserConfigMap = make(sysmodel.UserConfigMap)
	return tools.GetMapByFile(userConfigFile, res)
}
func GetPidConfigFromFile() (map[string]map[string]any, error) {
	file := getPIDConfigFile()
	var res map[string]map[string]any = make(map[string]map[string]any)
	return tools.GetMapByFile(file, res)
}
func SetUserConfigIntoFile(b sysmodel.UserConfigMap) error {
	for _, config := range b {
		config.Username = strings.TrimSpace(config.Username)
	}
	file2 := GetUserConfigFile()
	file.CreateFile(file2)
	err := tools.WriteObjectIntoFileWithMergeChecking(file2, b)
	return err
}

func ReadUserAnyKeyFromFile(userId string, key string) (string, error) {
	file := GetUserAnyKeyFile(userId, key)
	if tools.IsFileNonExist(file) {
		return "", nil
	}
	a, b := tools.ReadFileAsBytes(file)
	if b != nil {
		return "", b
	}
	return string(a), nil
}
