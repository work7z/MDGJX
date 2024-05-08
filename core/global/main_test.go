// Date: Wed, 11 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

// BEGIN: 6f2d9c3d7f3a
package global

import (
	"laftools-go/core/tools"
	"os"
	"path/filepath"
	"testing"
)

func TestUUID(t *testing.T) {
	uuid := UUID()
	if len(uuid) != 32 {
		t.Errorf("UUID() = %v, want length 32", uuid)
	}
}

func TestWriteIntoFileAtomic(t *testing.T) {
	file := "test.txt"
	str := "test string"
	err := WriteIntoFileAtomic(file, str)
	if err != nil {
		t.Errorf("WriteIntoFileAtomic() error = %v", err)
	}
	defer os.Remove(file)
}

func TestToJSONStr(t *testing.T) {
	type testStruct struct {
		Name string `json:"name"`
		Age  int    `json:"age"`
	}
	obj := testStruct{Name: "test", Age: 20}
	jsonStr, err := ToJSONStr(obj)
	if err != nil {
		t.Errorf("ToJSONStr() error = %v", err)
	}
	expectedJSONStr := `{"name":"test","age":20}`
	if jsonStr != expectedJSONStr {
		t.Errorf("ToJSONStr() = %v, want %v", jsonStr, expectedJSONStr)
	}
}

func TestGetResourceFormDir(t *testing.T) {
	expectedDir := filepath.Join(GetResourceDir(), "form")
	dir := GetResourceFormDir()
	if dir != expectedDir {
		t.Errorf("GetResourceFormDir() = %v, want %v", dir, expectedDir)
	}
}

func TestGetResourceNonProhibitedDir(t *testing.T) {
	expectedDir := filepath.Join(GetResourceDir(), "public")
	dir := GetResourceNonProhibitedDir()
	if dir != expectedDir {
		t.Errorf("GetResourceNonProhibitedDir() = %v, want %v", dir, expectedDir)
	}
}

func TestGetFrontEndStaticDir(t *testing.T) {
	expectedDir := filepath.Join(GetFrontEndRootAppDir(), "static")
	dir := GetFrontEndStaticDir()
	if dir != expectedDir {
		t.Errorf("GetFrontEndStaticDir() = %v, want %v", dir, expectedDir)
	}
}

func TestGetLangDir(t *testing.T) {
	expectedDir := filepath.Join(GetResourceDir(), "lang")
	dir := GetLangDir()
	if dir != expectedDir {
		t.Errorf("GetLangDir() = %v, want %v", dir, expectedDir)
	}
}

func TestGetResourceDir(t *testing.T) {
	expectedDir := GetSelfExecutionDir() + "/resources"
	dir := GetResourceDir()
	if dir != expectedDir {
		t.Errorf("GetResourceDir() = %v, want %v", dir, expectedDir)
	}
}

func TestGetSelfExecutionDir(t *testing.T) {
	expectedDir := tools.LafToolsAppBaseDir
	dir := GetSelfExecutionDir()
	if dir != expectedDir {
		t.Errorf("GetSelfExecutionDir() = %v, want %v", dir, expectedDir)
	}
}

func TestOpenInBrowser(t *testing.T) {
	// This test only checks if the function runs without error
	OpenInBrowser("https://www.google.com")
}

// END: 6f2d9c3d7f3a
