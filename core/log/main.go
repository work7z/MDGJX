// Date: Mon, 25 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package log

import (
	"os"

	"github.com/sirupsen/logrus"
)

const TYPE_ERROR = "ERROR"
const TYPE_WARN = "WARN"

// Create a new instance of the InternalLog.er. You can have any number of instances.
var InternalLog = logrus.New()

func Ref() *logrus.Logger {
	// shouldJSON := env.ShouldPrintLogAsJSON
	// if shouldJSON {
	// 	// InternalLog.as JSON instead of the default ASCII formatter.
	// 	InternalLog.SetFormatter(&logrus.JSONFormatter{})
	// 	// Output to stdout instead of the default stderr
	// 	// Can be any io.Writer, see below for File example
	// 	InternalLog.SetOutput(os.Stdout)
	// 	// Only InternalLog.the warning severity or above.
	// 	InternalLog.SetLevel(logrus.InfoLevel)
	// } else {
	// }
	// while dev mode, using text formatter by default
	InternalLog.SetFormatter(&logrus.TextFormatter{})
	// Output to stdout instead of the default stderr
	// Can be any io.Writer, see below for File example
	InternalLog.SetOutput(os.Stdout)
	// Only InternalLog.the warning severity or above.
	InternalLog.SetLevel(logrus.DebugLevel)

	return InternalLog
}

type GlobalLogType struct {
	MsgID       string
	Type        string
	Title       string
	Description string
}
type GlobalLogCollector struct {
	List []GlobalLogType
}

var instGlobalLogCollector = GlobalLogCollector{}

func PublishLogToExternalLog(item GlobalLogType) {
	// instGlobalLogCollector.List = append(instGlobalLogCollector.List, item)
	// a, err := json.Marshal(instGlobalLogCollector)
	// if err == nil {
	// 	filepath := path.Join(global.GetAppHomeDirectory(), "publish-to-external.json")
	// 	err2 := ioutil.WriteFile(filepath, a, 0755)
	// 	if err2 != nil {
	// 		InternalLog.Warnf("Publish-log-pid.json unable to access")
	// 	}
	// } else {
	// 	if err != nil {
	// 		panic("Unable to publish log to external log")
	// 	}
	// }
}
