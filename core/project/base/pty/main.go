// Date: Wed, 27 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package pty

import (
	"encoding/json"
	"laftools-go/core/log"
	"os"
	"strconv"
	"time"
)

type windowSize struct {
	Rows uint16 `json:"rows"`
	Cols uint16 `json:"cols"`
	X    uint16
	Y    uint16
}
type OptWSRequest struct {
	Type string
	Uid  string
	Rows uint16
	Cols uint16
}
type ConcertoClz struct {
	Message   string `json:"message"`
	Port      string `json:"port"`
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
	Token     string `json:"token"`
}

var concertoFilePath = os.Args[1]
var concerto ConcertoClz

func saveConcertoClz() {
	log.Ref().Info("Saving the concerto clz...")
	log.Ref().Info("time.Now().Unix()", time.Now().Unix())
	concerto.Timestamp = strconv.FormatInt(time.Now().Unix()*1000, 10)
	val, err := json.Marshal(concerto)
	log.Ref().Info("Marshal value: ", string(val))
	if err == nil {
		os.WriteFile(concertoFilePath, val, 0644)
	}
}

func ptyEntry() {
	// r.HandleFunc("/socket", handleTermWS)
	// r.HandleFunc("/opt", handleOptWS)
}
