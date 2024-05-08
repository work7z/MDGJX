// Date: Wed, 11 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package tools

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"time"

	"github.com/samber/lo"
)

var UNIT_TEST_SERVER_MODE bool
var FINALIZED_HTTP_PORT int
var NodeWSToken = GetRandomString(32)

func ReadFileAsString(filename string) string {
	if !IsFileExist(filename) {
		return ""
	}
	dat, err := ioutil.ReadFile(filename)
	if err != nil {
		return ""
	}
	return string(dat)
}

func Exit(code int) {
	os.Exit(code)
}

func ReadFileAsJson(DefaultConfigFile string, crtConfig interface{}) error {
	// read DefaultConfigFile as string
	str := ReadFileAsString(DefaultConfigFile)
	// unmarshal str into crtConfig
	return json.Unmarshal([]byte(str), &crtConfig)
}

func RenameFile(oldPath string, newPath string) error {
	return os.Rename(oldPath, newPath)
}
func CopyFile(src string, dst string) error {
	// read all content from src
	content := ReadFileAsString(src)
	// write content into dst
	return WriteFileAsStr(dst, content)
}
func WriteFileAsStr(filename string, content string) error {
	// firstly write to bak, then rename it to filename
	bakFile := filename + ".bak"
	err := ioutil.WriteFile(bakFile, []byte(content), 0644)
	if err != nil {
		return err
	}
	return RenameFile(bakFile, filename)
}

func GetFileLastModified(filename string) int {
	m, err := os.Lstat(filename)
	if err != nil {
		return 0
	}
	return int(m.ModTime().Unix())
}

func ToJson(obj interface{}) string {
	a, err := json.Marshal(obj)
	if err != nil {
		return ""
	}
	return string(a)
}

func Sleep(ms int) {
	time.Sleep(time.Duration(ms) * time.Millisecond)
}

func NormalizeDir(dir string) string {
	if dir == "" {
		return ""
	}
	// if dir[0] == '/' {
	// 	return dir[1:]
	// }
	// replace all / in path if it's window os
	if runtime.GOOS == "windows" {
		dir = strings.ReplaceAll(dir, "/", "\\")
	}
	// get correct text upper/lower case of dir
	// Evaluate symlinks to get the correct case on case-sensitive file systems
	dir, err := filepath.EvalSymlinks(dir)
	if err != nil {
		// ignore it
	}

	return dir
}

func OpenDir(dir string) error {

	dir = NormalizeDir(dir)

	if !IsFileExist(dir) {
		return errors.New("unable to find the directory")
	}

	var cmd *exec.Cmd

	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("explorer", dir)
	case "darwin":
		cmd = exec.Command("open", dir)
	case "linux":
		cmd = exec.Command("xdg-open", dir)
	default:
		return fmt.Errorf("unsupported platform")
	}

	err := cmd.Start()
	if err != nil {
		fmt.Println("Failed to open directory:", err)
		return err
	}

	return nil
}

func GetFileLastModifiedTimestamp(filename string) (int64, error) {
	m, err := os.Lstat(filename)
	if err != nil {
		return 0, err
	}
	return m.ModTime().Unix(), nil
}

func AssignJSONToObj(prevObj interface{}, returnValue interface{}) error {
	str, er2 := json.Marshal(prevObj)
	if er2 != nil {
		return er2
	}
	er3 := json.Unmarshal(str, &returnValue)
	if er3 != nil {
		return er3
	}
	return nil
}

func GetRandomString(length int) string {
	return lo.RandomString(int(length), lo.UpperCaseLettersCharset)
}

func CheckStr(m string) (string, bool) {
	return m, lo.IsNotEmpty(m)
}

// write a function for WriteStrIntoFile
func WriteStrIntoFile(filename string, content string) error {
	return WriteBytesIntoFile(filename, []byte(content))
}

// write a function for WriteStrIntoFile
func WriteObjIntoFile(filename string, content interface{}) error {
	a, err := json.Marshal(content)
	if err != nil {
		return err
	}
	return WriteBytesIntoFile(filename, []byte(a))
}

func WriteBytesIntoFile(filename string, content []byte) error {
	return ioutil.WriteFile(filename, content, 0644)
}
