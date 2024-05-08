// Date: Sun, 22 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"io"
	"laftools-go/core/global"
	"laftools-go/core/handlers/context"
	"laftools-go/core/project/syspath"
	"laftools-go/core/tools"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

type FileInfo struct {
	RefID    string
	FileSize int
	FileName string
}

func readTempFile(c *gin.Context) {
	// Check if the request method is GET
	if c.Request.Method != "GET" {
		c.AbortWithStatus(http.StatusMethodNotAllowed)
		return
	}
	wc := context.NewWC(c)

	// Get the file name from the GET parameters
	filename := c.Query("refID")
	if filename == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		ErrLa2(c, wc.Dot("5ifiP", "File Not Found"))
		return
	}

	// Set the path to the file
	tempDir := syspath.GetAppTempUploadDir()
	filepath := filepath.Join(tempDir, filename)

	// Check if the file exists and is not a directory
	fileInfo, err := os.Stat(filepath)
	if os.IsNotExist(err) || fileInfo.IsDir() {
		ErrLa(c, err)
		return
	}

	// read filename as string,
	// and return it as a response
	a, b := tools.ReadFileAsStrWithNoTrim(filepath)
	if b != nil {
		ErrLa(c, b)
		return
	}
	OKLa(c, DoValueRes(gin.H{
		"content": a,
	}))
}

type OsOpenForm struct {
	Dir string `json:"dir"`
}

func checkIfFileExist(c *gin.Context) {
	var openForm = &OsOpenForm{}
	c.BindJSON(openForm)
	OKLa(c, DoValueRes(tools.IsFileExist(openForm.Dir)))
}

func mkdirDir(c *gin.Context) {
	var openForm = &OsOpenForm{}
	c.BindJSON(openForm)
	OKLa(c, DoValueRes(tools.MkdirDirWithStr(openForm.Dir)))
}

func openDir(c *gin.Context) {
	var openForm = &OsOpenForm{}
	c.BindJSON(openForm)
	err := tools.OpenDir(openForm.Dir)
	if err != nil {
		ErrLa(c, err)
	} else {
		OKLa(c, DoValueRes(1))
	}
}

// complete a function uploadTempFile, which will be used in core/api/Route.go, and saving the uploaded file to the directory core/config/ConfigPath.go:GetAppTempUploadDir()
func uploadTempFile(c *gin.Context) {
	// Check if the request method is POST
	if c.Request.Method != "POST" {
		c.AbortWithStatus(http.StatusMethodNotAllowed)
		return
	}

	// Parse the multipart form data
	err := c.Request.ParseMultipartForm(1 << 30) // 1 GB
	if err != nil {
		ErrLa(c, err)
		return
	}

	// Get the file from the form data
	file, handlers, err := c.Request.FormFile("file")
	refID := global.UUID()
	if err != nil {
		ErrLa(c, err)
		return
	}
	defer file.Close()

	// Create a new file on the server
	tempDir := syspath.GetAppTempUploadDir()

	// clean historical files under tempDir which was created 1 hours ago
	global.CleanHistoricalFilesByHour(tempDir, 1)

	err = os.MkdirAll(tempDir, os.ModePerm)
	if err != nil {
		ErrLa(c, err)
		return
	}
	f, err := os.OpenFile(filepath.Join(tempDir, refID), os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		ErrLa(c, err)
		return
	}
	defer f.Close()

	// Copy the file data to the new file
	_, err = io.Copy(f, file)
	if err != nil {
		ErrLa(c, err)
		return
	}

	// Return a success message
	OKLa2(c, DoValueRes(FileInfo{
		RefID:    refID,
		FileSize: int(handlers.Size),
		FileName: handlers.Filename,
	}))

}
