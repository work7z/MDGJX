// Date: Sat, 25 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"laftools-go/core/handlers/context"
	"laftools-go/core/project/syspath"
	"testing"
)

// TODO: make it good later

func TestAddNewWorkspace(t *testing.T) {
	// tools.MkdirFileWithStr("/home")
	// // Create a mock context and web context
	// c := &gin.Context{}
	// wc := context.WebContext{
	// 	OverwriteUserLang: "zh_CN",
	// 	OverwriteUserId:   "testuser",
	// }

	// // Create a new workspace
	// newSpace := &EachWorkSpace{
	// 	Id:    "SGPSI",
	// 	Label: "Test Workspace",
	// 	Path:  "/home",
	// }

	// // Call the function
	// deleteWorkspaceByID(&wc, newSpace.Path)
	// deleteWorkspaceByID(&wc, newSpace.Id)

	// err := AddNewWorkspace(newSpace, c, wc)

	// // Assert that there is no error
	// assert.NoError(t, err)

	// // Assert that the workspace was added to the configuration file
	// workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	// workspaceRes := GetWorkspaceStruct(workspaceConfigFile)
	// assert.Contains(t, workspaceRes.WorkSpaces, *newSpace)

	// // Try adding the same workspace again
	// err = AddNewWorkspace(newSpace, c, wc)

	// // Assert that an error is returned
	// expectedErr := errors.New(wc.Dot("2nKgN", "the file path is used by other workspace"))
	// assert.EqualError(t, err, expectedErr.Error())
}
func TestDeleteWorkspaceByID(t *testing.T) {
	// // Create a mock context and web context
	// wc := context.WebContext{
	// 	OverwriteUserLang: "zh_CN",
	// 	OverwriteUserId:   "testuser",
	// }

	// // Create a workspace to be deleted
	// workspaceToDelete := &EachWorkSpace{
	// 	Id:   "workspace1",
	// 	Path: "/path/to/workspace1",
	// }

	// // Create a workspace that should not be deleted
	// workspaceToKeep := &EachWorkSpace{
	// 	Id:   "workspace2",
	// 	Path: "/path/to/workspace2",
	// }

	// // Add workspaces to the configuration file
	// workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	// workspaceRes := GetWorkspaceStruct(workspaceConfigFile)
	// workspaceRes.WorkSpaces = append(workspaceRes.WorkSpaces, workspaceToDelete, workspaceToKeep)
	// tools.WriteObjIntoFile(workspaceConfigFile, workspaceRes)

	// // Call the function to delete the workspace
	// deleteWorkspaceByID(&wc, workspaceToDelete.Id)

	// // Assert that the workspace was deleted from the configuration file
	// updatedWorkspaceRes := GetWorkspaceStruct(workspaceConfigFile)
	// assert.NotContains(t, updatedWorkspaceRes.WorkSpaces, *workspaceToDelete)
	// assert.Contains(t, updatedWorkspaceRes.WorkSpaces, *workspaceToKeep)
}
func TestGetWorkspaceList(t *testing.T) {
	// Create a mock web context
	wc := context.WebContext{
		OverwriteUserLang: "zh_CN",
		OverwriteUserId:   "testuser",
	}

	// Call the function
	workspaceList := syspath.GetWorkspaceList(&wc)
	t.Log("workspaceList", workspaceList)

}
