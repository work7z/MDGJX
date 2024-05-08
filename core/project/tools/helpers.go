// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package tools

import (
	"crypto/md5"
	"encoding/hex"
	"io"
	"laftools-go/core/project/base/form"
	"os"

	"github.com/dablelv/cyan/crypto"
	"github.com/deatil/go-hash/hash"
	"github.com/deatil/go-hash/md2"
	"golang.org/x/crypto/md4"
)

func GetFileMD2(request form.TextRequest) (string, error) {
	return FileMD2(request.InputFile)
}

func GetMD2Str(str string) string {
	return hash.FromString(str).MD2().ToHexString()
}

func GetMD2ForText(request form.TextRequest) string {
	return GetMD2Str(request.InputText)
}

func GetFileMD5(request form.TextRequest) (string, error) {
	return FileMD5(request.InputFile)
}

func GetMD5ForText(request form.TextRequest) string {
	return crypto.Md5(request.InputText)
}

func FileMD5(filePath string) (string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	hash := md5.New()
	_, _ = io.Copy(hash, file)
	return hex.EncodeToString(hash.Sum(nil)), nil
}

func FileMD2(filePath string) (string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	hash := md2.New()
	_, _ = io.Copy(hash, file)
	return hex.EncodeToString(hash.Sum(nil)), nil
}

func FileMD4(filePath string) (string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	hash := md4.New()
	_, _ = io.Copy(hash, file)
	return hex.EncodeToString(hash.Sum(nil)), nil
}
