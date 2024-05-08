// Date: Tue, 26 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"encoding/json"
	"laftools-go/core/log"
	"laftools-go/core/project/base/pty"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// term ws
func websocket_term_ws(c *gin.Context) {
	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)

	if err != nil {
		log.Ref().Error("Unable to upgrade connection", err)
		return
	}
	if !VerifyWSRequest(c) {
		returnInvalidWS(ws)
		return
	}

	w := c.Writer
	r := c.Request
	log.Ref().Infof("remoteaddr, %s", r.RemoteAddr)
	conn := ws

	log.Ref().Info("Interact with " + r.URL.RawQuery)
	// concerto.Token

	if !VerifyWSRequest(c) {
		returnInvalidWS(ws)
		return
	}

	pty.InternalHandleTermWS(w, r, conn)
}

// opt ws
func websocket_opt_ws(c *gin.Context) {

	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	if !VerifyWSRequest(c) {
		returnInvalidWS(ws)
		return
	}

	r := c.Request
	if !VerifyWSRequest(c) {
		returnInvalidWS(ws)
		return
	}
	log.Ref().Info("Interact with " + r.URL.RawQuery)
	defer ws.Close()
	for {
		log.Ref().Info("looped here, receiving the Message...")
		_, message, err := ws.ReadMessage()
		if err != nil {
			log.Ref().Error("read:", err)
			break
		}
		log.Ref().Debugf("RECEIVED HERE: %s", string(message))
		var inst_OptWSRequest pty.OptWSRequest
		json.Unmarshal(message, &inst_OptWSRequest)
		if strings.Compare(inst_OptWSRequest.Type, "resize") == 0 {
			var token = r.URL.Query().Get("SessionId")
			pty.InternalHandleResize(inst_OptWSRequest, token)
		}

	}
	log.Ref().Info("Ending read the Message")
}
