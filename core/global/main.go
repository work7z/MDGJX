// Date: Wed, 20 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package global

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"laftools-go/core/tools"
	"log"
	"math/rand"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"runtime"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/natefinch/atomic"
	"github.com/sirupsen/logrus"
)

func UUID() string {
	a, _ := uuid.NewUUID()
	return strings.ReplaceAll(string(a.String()), "-", "")
}

// short uuid
func ShortUUID() string {
	return UUID()[0:8]
}
func ShortShortUUID() string {
	return UUID()[0:5]
}
func WriteIntoFileAtomic(file string, str string) error {
	e := atomic.WriteFile(file, strings.NewReader(str))
	return e
}
func ToJSONStr(obj any) (string, error) {
	a, err := json.Marshal(obj)
	if err != nil {
		return "" + err.Error(), err
	} else {
		return string(a), nil
	}
}

func GetResourceFormDir() string {
	return path.Join(GetResourceDir(), "form")
}
func GetResourceNonProhibitedDir() string {
	return path.Join(GetResourceDir(), "public")
}

func GetPureJSFolder() string {
	return path.Join(GetResourceNonProhibitedDir(), "purejs")
}
func GetPureJSLangFolder() string {
	return path.Join(GetPureJSFolder(), "lang")
}
func CleanHistoricalFilesByHour(dir string, hour int) {
	CleanHistoricalFilesByMinute(dir, hour*60)
}
func CleanHistoricalFilesByMinute(dir string, minute int) {
	CleanHistoricalFilesBySecond(dir, minute*60)
}
func CleanHistoricalFilesBySecond(dir string, second int) {
	// Get the current time minus the specified number of seconds
	cutoffTime := time.Now().Add(-time.Duration(second) * time.Second)

	// Get a list of files in the directory
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		log.Printf("Error reading directory %s: %s", dir, err)
		return
	}

	// Iterate over the files and delete any that are older than the cutoff time
	for _, file := range files {
		if file.ModTime().Before(cutoffTime) {
			err := os.Remove(filepath.Join(dir, file.Name()))
			if err != nil {
				log.Printf("Error deleting file %s: %s", file.Name(), err)
			} else {
				log.Printf("Deleted file %s", file.Name())
			}
		}
	}
}

func GetFrontEndStaticDir() string {
	return path.Join(GetFrontEndRootAppDir(), "static")
}
func GetFrontEndRootAppDir() string {
	if tools.IsDevMode {
		return path.Join(tools.LafToolsAppBaseDir, "/modules/web/build")
	} else {
		return path.Join(tools.LafToolsAppBaseDir, "web")
	}
}
func GetLangDir() string {
	return path.Join(GetResourceDir(), "lang")
}
func GetResourceDir() string {
	return path.Join(GetSelfExecutionDir(), "resources")
}
func GetSelfExecutionDir() string {
	if tools.LafToolsAppBaseDir == "" {
		logrus.Fatal("Warning, LafTools Root is empty, note that it's not proper setup.")
	}
	return tools.LafToolsAppBaseDir
}

func OpenInBrowser(url string) {
	var err error
	switch runtime.GOOS {
	case "linux":
		if tools.IsDockerMode() {
			fmt.Println("ignore this command in docker mode")
			return
		}
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "config.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Panic(err)
	}
}

// create a function that random pick a object from array, it should be generic type
func RandomPickOneFromList[T any](arr []T) T {
	return arr[RandomInt(0, len(arr)-1)]
}

func RandomPickOne(arr []string) string {
	return arr[RandomPickOneIndex(arr)]
}
func RandomPickOneIndex(arr []string) int {
	return RandomInt(0, len(arr)-1)
}
func RandomInt(min int, max int) int {
	return min + rand.Intn(max-min)
}
