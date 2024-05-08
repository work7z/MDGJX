//go:build windows
// +build windows

// Date: Wed, 27 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package pty

import (
	"bufio"
	"bytes"
	"encoding/json"
	"flag"
	"io"
	"laftools-go/core/tools"
	"log"
	"net/http"
	"os"
	"path"
	"unicode/utf8"

	"github.com/gorilla/websocket"
	"github.com/iamacarpet/go-winpty"
)

var shared_term_inst_map = make(map[string]*winpty.WinPTY)
var addrFlag, cmdFlag, staticFlag string

type Message struct {
	Type string          `json:"type"`
	Data json.RawMessage `json:"data"`
}

type wsPty struct {
	Pty   *winpty.WinPTY
	ws    *websocket.Conn
	token string
}

func getPtyDir() string {
	if tools.IsDevMode {
		return path.Join(tools.LafToolsAppBaseDir, "pipeline/parcel/patch/windows-x64")
	} else {
		return ""
	}
}

func (wp *wsPty) Start() {
	var err error
	// If you want to use a location other than the same folder for the DLL and exe
	// specify the path as the first param, e.g. winpty.Open(`C:\MYAPP\support`, cmdFlag)
	// wp.Pty, err = winpty.Open("", cmdFlag)
	wp.Pty, err = winpty.Open(getPtyDir(), cmdFlag)
	if err != nil {
		log.Printf("Failed to start command: %s\n", err)
	}
	//Set the size of the pty
	wp.Pty.SetSize(200, 60)
}
func (wp *wsPty) Stop() {
	wp.Pty.Close()

	wp.ws.Close()
}

func (wp *wsPty) readPump() {

	defer wp.Stop()

	for {
		mt, payload, err := wp.ws.ReadMessage()
		if err != nil {
			if err != io.EOF {
				log.Printf("conn.ReadMessage failed: %s\n", err)
				return
			}
		}
		log.Print("Payload: ", payload)
		//var msg Message
		switch mt {
		case websocket.BinaryMessage:
			log.Printf("Ignoring binary Message: %q\n", payload)
		case websocket.TextMessage:
			log.Printf("Handling text Message: %q\n", payload)
			wp.Pty.StdIn.Write([]byte(payload))
		default:
			log.Printf("Invalid Message type %d\n", mt)
			return
		}
	}
}

func (wp *wsPty) writePump() {
	defer wp.Stop()

	buf := make([]byte, 8192)
	reader := bufio.NewReader(wp.Pty.StdOut)
	var buffer bytes.Buffer
	for {
		n, err := reader.Read(buf)
		if err != nil {
			log.Printf("Failed to read from pty master 1: %s", err)
			wp := wsPty{ws: wp.ws, token: wp.token}
			wp.Start()
			shared_term_inst_map[wp.token] = wp.Pty
			return
		}
		//read byte array as Unicode code points (rune in go)
		bufferBytes := buffer.Bytes()
		runeReader := bufio.NewReader(bytes.NewReader(append(bufferBytes[:], buf[:n]...)))
		buffer.Reset()
		i := 0
		for i < n {
			char, charLen, e := runeReader.ReadRune()
			if e != nil {
				log.Printf("Failed to read from pty master 2: %s", err)
				wp := wsPty{ws: wp.ws, token: wp.token}
				wp.Start()
				shared_term_inst_map[wp.token] = wp.Pty
				return
			}
			if char == utf8.RuneError {
				runeReader.UnreadRune()
				break
			}
			i += charLen
			buffer.WriteRune(char)
		}
		err = wp.ws.WriteMessage(websocket.TextMessage, buffer.Bytes())
		if err != nil {
			log.Printf("Failed to send UTF8 char: %s", err)
			return
		}
		buffer.Reset()
		if i < n {
			buffer.Write(buf[i:n])
		}
	}
}

//var prev_tty = shared_term_inst_map[token]
//if prev_tty != nil {
//prev_tty.Close()
//}

func InternalHandleTermWS(w http.ResponseWriter, r *http.Request, conn *websocket.Conn) {
	var token = r.URL.Query().Get("SessionId")
	wp := wsPty{ws: conn, token: token}
	wp.Start()
	shared_term_inst_map[token] = wp.Pty

	go wp.writePump()
	wp.readPump()
}

func InternalHandleResize(inst_OptWSRequest OptWSRequest, token string) {
	var prev_pty = shared_term_inst_map[token]
	if prev_pty != nil {
		prev_pty.SetSize(uint32(inst_OptWSRequest.Rows), uint32(inst_OptWSRequest.Cols))
	}
}

func init() {
	cwd, _ := os.Getwd()
	flag.StringVar(&addrFlag, "addr", ":9000", "IP:PORT or :PORT address to listen on")
	flag.StringVar(&cmdFlag, "cmd", "cmd", "command to execute on slave side of the pty")
	flag.StringVar(&staticFlag, "static", cwd, "path to static content")
}
