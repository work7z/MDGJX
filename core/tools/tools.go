// Date: Fri, 22 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package tools

import (
	"bufio"
	"encoding/json"
	"laftools-go/core/log"
	"os"
	"path"
	"strings"

	"github.com/dablelv/cyan/conv"
	"github.com/dablelv/cyan/file"
)

func GetMapByFile[T any](userConfigFile string, res T) (T, error) {
	if !IsFileExist(userConfigFile) {
		return res, nil
	}
	a, err := ReadFileAsBytes(userConfigFile)
	if err != nil {
		log.Ref().Error("Unable to read the config file", userConfigFile)
		return res, err
	}
	err2 := json.Unmarshal(a, &res)
	if err2 != nil {
		log.Ref().Error("Unable to parse the config file", userConfigFile)
		return res, err
	}
	return res, nil
}

func IsDockerMode() bool {
	return strings.Index(Mode, "docker") != -1
}
func IsOnlineMode() bool {
	return strings.Index(Mode, "online") != -1
}

func IsFileNonExist(filename string) bool {
	return !IsFileExist(filename)
}
func IsFileExist(filename string) bool {
	a, b := file.IsExist(filename)
	if b != nil {
		return false
	} else {
		return a
	}
}
func MkdirDirWithStr(filename string) string {
	err := MkdirDir(filename)
	if err != nil {
		log.Ref().Warn("err", err)
	}
	return filename
}
func MkdirDir(filename string) error {
	if IsFileExist(filename) {
		return nil
	}
	return os.MkdirAll(filename, os.ModePerm)
}
func ShouldNoErr(e error, label string) {
	if e != nil {
		log.Ref().Panic("FATAL_ERROR:" + label + " -> " + e.Error())
	}
}

func ShouldShowWarning(e error, label string) {
	if e != nil {
		log.Ref().Warn("FATAL_WARNING:" + label + " -> " + e.Error())
	}
}
func JoinWithMkdir(arg ...string) error {
	newpath := path.Join(arg...)
	err := MkdirDir(newpath)
	if err != nil {
		return err
	}
	return nil
}

func ReadFileAsStr(filename string) (string, error) {
	s, a := os.ReadFile(filename)
	if a != nil {
		return "", a
	} else {
		return strings.TrimSpace(string(s)), nil
	}
}

// func ConvertUnixPathToWindowsPathWithDiskLetter(path string) string {
// return	"C:\\Users\\jerrylai\\hmproject\\laf-tools"
// }
func ReadFileAsStrWithNoTrim(filename string) (string, error) {
	s, a := os.ReadFile(filename)
	if a != nil {
		return "", a
	} else {
		return string(s), nil
	}
}

func ReadFileAsBytes(filename string) ([]byte, error) {
	s, a := os.ReadFile(filename)
	if a != nil {
		return nil, a
	} else {
		return s, nil
	}
}

func ToAnyString(obj interface{}) string {
	a, err := conv.ToStringE(obj)
	if err != nil {
		return err.Error()
	}
	return a
}
func ReadJSONFileWithFatal(filename string) map[string]string {
	fileStr, err := ReadFileAsBytes(filename)
	ShouldNoErr(err, "unable to parse this file: "+filename)
	var obj map[string]string
	err2 := json.Unmarshal(fileStr, &obj)
	ShouldNoErr(err2, "Unable to parse its JSON: "+filename)
	return obj
}

type JSONRes = map[string]string

func ReadJSONFile(filename string) (JSONRes, error) {
	fileStr, err := ReadFileAsBytes(filename)
	ShouldNoErr(err, "unable to parse this file: "+filename)
	if err != nil {
		return nil, err
	}
	var obj map[string]string
	err2 := json.Unmarshal(fileStr, &obj)
	if err2 != nil {
		return nil, err2
	}
	return obj, nil
}
func ReadPropertiesFile(filename string) (map[string]string, error) {
	config := map[string]string{}

	if len(filename) == 0 {
		return config, nil
	}
	file, err := os.Open(filename)
	if err != nil {
		log.Ref().Panic(err)
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if equal := strings.Index(line, "="); equal >= 0 {
			if key := strings.TrimSpace(line[:equal]); len(key) > 0 {
				value := ""
				if len(line) > equal {
					value = strings.TrimSpace(line[equal+1:])
				}
				config[key] = value
			}
		}
	}

	if err := scanner.Err(); err != nil {
		log.Ref().Panic(err)
		return nil, err
	}

	return config, nil
}
