// Date: Tue, 5 Dec 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"errors"
	"laftools-go/core/handlers/context"
	"laftools-go/core/log"
	"laftools-go/core/project/syspath"
	"laftools-go/core/tools"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

var globalValMap map[string]interface{} = make(map[string]interface{})
var lockAPI = &sync.Mutex{}

// var incrementForGlobalVal = 0

type syncReqForm struct {
	RequireWorkspaceId bool
	RequireUserId      bool
	Name               string `json:"name"`
}

func contactKeyByReq(c *gin.Context) (string, error) {
	wc := context.NewWC(c)
	syncForm := &syncReqForm{}
	err := c.BindQuery(&syncForm)
	if err != nil {
		return "", err
	}
	reducerName := syncForm.Name // c.Query("name")
	if reducerName == "" {
		return "", errors.New(wc.Dot("DSXi7", "Reducer name is empty"))
	}
	finalKey := reducerName
	userId := wc.GetUserID()
	workspaceId := wc.GetWorkspaceID()
	// workspace is required for some reducers
	RequireWorkspaceId := syncForm.RequireWorkspaceId // c.Query("RequireWorkspaceId") == "true"
	RequireUserId := syncForm.RequireUserId           // c.Query("RequireUserId") == "true"
	if RequireUserId && userId == "" {
		return "", errors.New(wc.Dot("q5_aE", "UserID is empty"))
	}
	if RequireWorkspaceId && workspaceId == "" {
		return "", errors.New(wc.Dot("ubU3g", "WorkspaceID is empty"))
	}
	if RequireUserId {
		finalKey = finalKey + userId
	}
	if RequireWorkspaceId {
		finalKey = finalKey + workspaceId
	}
	return finalKey, nil
}

func getSyncReducer(c *gin.Context) {
	lockAPI.Lock()
	defer lockAPI.Unlock()
	// get reducer
	crtKey, err := contactKeyByReq(c)
	if err != nil {
		ErrLa2(c, err.Error())
		return
	}
	wc := context.NewWC(c)
	workspaceId := wc.GetWorkspaceID()
	reducer, err := syspath.ReadSyncDataFromWorkspaceMap(workspaceId, wc, crtKey)
	if err != nil {
		ErrLa2(c, err.Error())
		return
	}
	if reducer == nil {
		ErrLa2(c, "Reducer not found, crtKey: "+crtKey)
		return
	}
	// get state
	OKLa(c, DoValueRes(reducer))
}

func saveSyncReducer(c *gin.Context) {
	lockAPI.Lock()
	defer lockAPI.Unlock()
	syncForm := &syncReqForm{}
	err := c.BindQuery(&syncForm)
	if err != nil {
		ErrLa2(c, err.Error())
		return
	}
	// get reducer
	crtKey, err := contactKeyByReq(c)
	if err != nil {
		ErrLa2(c, err.Error())
		return
	}
	// get state
	var state interface{}
	if err := c.BindJSON(&state); err != nil {
		ErrLa(c, err)
		return
	}
	// save state
	wc := context.NewWC(c)

	prevFn, ok := debouncedFnMap.Load(crtKey)
	if !ok {
		de, _ := lo.NewDebounce(3000*time.Millisecond, func() {
			tmp1, tmp2 := debouncedValueMap.Load(crtKey)
			if !tmp2 {
				log.Ref().Warn("unknown crtKey: ", crtKey)
				return
			}
			val := tmp1.(string)
			syspath.WriteMapDataIntoWorkspaceFile(wc.GetWorkspaceID(), context.NewWC(c), val, crtKey)
		})
		debouncedFnMap.Store(crtKey, de)
		prevFn = de
	}

	syspath.WriteMapDataIntoWorkspaceFileForCache(wc.GetWorkspaceID(), context.NewWC(c), tools.ToJson(state), crtKey)
	debouncedValueMap.Store(crtKey, tools.ToJson(state))
	prevFn.(func())()

	OKLa(c, DoValueRes(gin.H{
		"msg":    "saved",
		"crtKey": crtKey,
	}))

}

var debouncedFnMap sync.Map = sync.Map{}
var debouncedValueMap sync.Map = sync.Map{}

func init() {
	// last_updateIdx := 0
	// // last_modifiedFile := 0
	// reducerSyncFile := config.GetCurrentReducerSyncFile()
	// if tools.IsFileExist(reducerSyncFile) {
	// 	str, err := tools.ReadFileAsStr(reducerSyncFile)
	// 	if err != nil {
	// 		log.Ref().Warn("unable to read reducer sync file: ", err)
	// 	} else {
	// 		// rename reducer sync file as *.bak
	// 		tools.CopyFile(reducerSyncFile, reducerSyncFile+".bak"+tools.GetRandomString(8))
	// 		// unmarhsla str to tmpReducerValueMap
	// 		err2 := json.Unmarshal([]byte(str), &globalValMap)
	// 		if err2 != nil {
	// 			log.Ref().Warn("unable to unmarshal reducer sync file: ", err2)
	// 		}
	// 	}
	// }
	// go func() {
	// 	// every 3 seconds, write tmpReducerValueMap to reducerSyncFile
	// 	for {
	// 		tools.Sleep(3000)
	// 		if last_updateIdx != incrementForGlobalVal {
	// 			last_updateIdx = incrementForGlobalVal
	// 			lockAPI.Lock()
	// 			tools.WriteFileAsStr(reducerSyncFile, tools.ToJson(globalValMap))
	// 			// last_modifiedFile = tools.GetFileLastModified(reducerSyncFile)
	// 			lockAPI.Unlock()
	// 		}
	// 		// if last_modifiedFile != tools.GetFileLastModified(reducerSyncFile) {
	// 		// 	last_modifiedFile = tools.GetFileLastModified(reducerSyncFile)
	// 		// 	str, err := tools.ReadFileAsStr(reducerSyncFile)
	// 		// 	if err != nil {
	// 		// 		log.Ref().Warn("unable to read reducer sync file: ", err)
	// 		// 	} else {
	// 		// 		// unmarhsla str to tmpReducerValueMap
	// 		// 		lockAPI.Lock()
	// 		// 		err2 := json.Unmarshal([]byte(str), &tmpReducerValueMap)
	// 		// 		lockAPI.Unlock()
	// 		// 		if err2 != nil {
	// 		// 			log.Ref().Warn("unable to unmarshal reducer sync file: ", err2)
	// 		// 		}
	// 		// 	}
	// 		// }
	// 	}
	// }()
}
