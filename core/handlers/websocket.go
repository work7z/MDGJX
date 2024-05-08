// Date: Thu, 19 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"encoding/json"
	"laftools-go/core/config"
	"laftools-go/core/log"
	"laftools-go/core/project/base/env"
	"laftools-go/core/tools"
	"net/http"
	"path"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func getUpgrader() websocket.Upgrader {
	var upGrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	return upGrader
}

var upGraderForDuplex = getUpgrader()

func getHeaderClientToken(c *gin.Context) string {
	return c.Query("lut")
}

func getPageId(c *gin.Context) string {
	return c.Query("pd")
}

func VerifyWSRequest(c *gin.Context) bool {
	nodeToken := c.Query("node-token")
	if nodeToken != "" {
		if nodeToken == tools.NodeWSToken {
			return true
		}
	}

	headerClientToken := getHeaderClientToken(c) // local account token
	_, item_f := config.GetItemByTokenDirectly(headerClientToken)
	return headerClientToken != "" && item_f
}

type SaveConnMark struct {
	wsConn    *websocket.Conn
	userToken string
}
type WsReq struct {
	Mtype string
	Value interface{}
}

// define a global variable to map token to ws
var GLOBAL_WS_MAP = make(map[string]map[string]*SaveConnMark)

// set a locker for GLOBAL_WS_MAP
var GLOBAL_WS_MAP_LOCKER = &sync.Mutex{}

func GetWSMarkByPageId(c *gin.Context) *SaveConnMark {
	GLOBAL_WS_MAP_LOCKER.Lock()
	defer func() {
		GLOBAL_WS_MAP_LOCKER.Unlock()
	}()
	m := GLOBAL_WS_MAP[c.GetHeader(tools.HEADER_LOCAL_USER_TOKEN)]
	if m == nil {
		return nil
	}
	return m[c.GetHeader(tools.HEADER_LOCAL_PAGE_ID)]
}
func GetWSMarkListByTokenId(c *gin.Context) map[string]*SaveConnMark {
	GLOBAL_WS_MAP_LOCKER.Lock()
	defer func() {
		GLOBAL_WS_MAP_LOCKER.Unlock()
	}()
	m := GLOBAL_WS_MAP[c.GetHeader(tools.HEADER_LOCAL_USER_TOKEN)]
	if m == nil {
		return nil
	}
	return m
}

func getAllNodeJobs(c *gin.Context) {
	if !VerifyWSRequest(c) {
		ErrLa2(c, "no permission")
		return
	}
	// get all jobs
	// reqSet := tools.Ref_NodeReqSet.Map
	// OKLa(c, DoValueRes(reqSet))
}

var Lock_tmp_NodeWebsocket = &sync.Mutex{}

type HmrReloadConfig struct {
	Files []string
}

// set a lock for hmr ws
var HmrReloadConfigLocker = &sync.Mutex{}

// post a job to Go/Node, then receive response from remote server
func websocket_hmrreload(c *gin.Context) {
	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	if !VerifyWSRequest(c) {
		returnInvalidWS(ws)
		return
	}

	defer func() {
		// do nothing, just recover
		recover()
	}()
	var shouldReturn = false
	var crtLockForWS = &sync.Mutex{}
	configHmrFile := path.Join(tools.LafToolsAppBaseDir, "modules/web/src/init/hmr.json")
	var reloadConfig *HmrReloadConfig = &HmrReloadConfig{}
	if tools.IsFileExist(configHmrFile) {
		// unmarshal from configHmrFile
		str, _ := tools.ReadFileAsStr(configHmrFile)
		json.Unmarshal([]byte(str), reloadConfig)
		// check if each file is changed
		for _, _eachFile := range reloadConfig.Files {
			eachFile := path.Join(tools.LafToolsAppBaseDir, "modules/web/public", _eachFile)
			// get last timestamp
			// if changed, then send reload command to ws
			lastTimestamp, _ := tools.GetFileLastModifiedTimestamp(eachFile)
			go func() {
				for {
					crtTimestamp, _ := tools.GetFileLastModifiedTimestamp(eachFile)
					if crtTimestamp != lastTimestamp {
						lastTimestamp = crtTimestamp
						crtLockForWS.Lock()
						err := ws.WriteJSON((DoValueRes("changed")))
						crtLockForWS.Unlock()
						if err != nil {
							shouldReturn = true
							return
						}
					}
					time.Sleep(env.PUBLIC_RELOAD_FREQUENCY)
				}
			}()
		}
	}
	for {
		select {
		// sleep 1 seconds and check
		case <-time.After(time.Second * 1):

		}
		if shouldReturn {
			return
		}
	}
}

// post a job to Go/Node, then receive response from remote server
func websocket_postjob(c *gin.Context) {
	// upgrade GET request to websocket protocol
	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	ws.WriteJSON(DoValueRes("Welcome to the Call API Service."))
}

func returnInvalidWS(ws *websocket.Conn) {
	ws.WriteJSON(DoValueResForWS(99, "INVALID_TOKEN", map[string]interface{}{
		"errors": "INVALID_TOKEN",
	}))
}

func websocket_system(c *gin.Context) {
	// upgrade GET request to websocket protocol
	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}

	defer ws.Close()
	// write hello for ws

	if !VerifyWSRequest(c) {
		returnInvalidWS(ws)
		return
	}

	headerClientToken := getHeaderClientToken(c) // local account token
	pageId := getPageId(c)
	if pageId == "" {
		ws.WriteJSON(DoValueResForWS(99, "NO_PAGE", map[string]interface{}{
			"errors": "NO_PAGE",
		}))
		return
	}

	setValueIntoGlobalWSMap := func(headerClientToken string, pageId string, value *SaveConnMark) {
		GLOBAL_WS_MAP_LOCKER.Lock()
		defer func() {
			GLOBAL_WS_MAP_LOCKER.Unlock()
		}()
		// Check if the first layer ID exists in the map
		if _, ok := GLOBAL_WS_MAP[headerClientToken]; !ok {
			// If not, create a new map for the first layer ID
			GLOBAL_WS_MAP[headerClientToken] = make(map[string]*SaveConnMark)
		}

		// Check if the second layer ID exists in the map
		if _, ok := GLOBAL_WS_MAP[headerClientToken][pageId]; ok {
			// If it exists, clean the previous record
			// check if wsConn exist
			if GLOBAL_WS_MAP[headerClientToken][pageId].wsConn != nil {
				GLOBAL_WS_MAP[headerClientToken][pageId].wsConn.Close()
			}
			delete(GLOBAL_WS_MAP[headerClientToken], pageId)
		}

		// Set the value into the map
		GLOBAL_WS_MAP[headerClientToken][pageId] = value
	}
	// set value into GLOBAL_WS_MAP, first layer id is headerClientToken, the second layer id is pageId, please check if it's nil and remember to clean prev record if have

	setValueIntoGlobalWSMap(headerClientToken, pageId, &SaveConnMark{
		userToken: headerClientToken,
		wsConn:    ws,
	})

	defer func() {
		GLOBAL_WS_MAP_LOCKER.Lock()
		defer func() {
			GLOBAL_WS_MAP_LOCKER.Unlock()
		}()
		// remove this pageId record
		delete(GLOBAL_WS_MAP[headerClientToken], pageId)
	}()

	log.Ref().Debug("received ws request")

	for {
		//读取ws中的数据
		_, message, err := ws.ReadMessage()
		if err != nil {
			break
		}
		crtReq := &WsReq{}
		json.Unmarshal(message, crtReq)
		var finValue interface{} = nil
		if crtReq.Mtype == "ping" {
			finValue = DoValueResForWS(0, "pong", "pong wor, ok jor.")
		}

		//写入ws数据
		if finValue == nil {
			finValue = DoValueResForWS(99, "unknown", "unknown wor, am i a joke to you?")
		}
		err = ws.WriteJSON(finValue)
		if err != nil {
			break
		}
	}
}
