// Date: Sun, 5 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package tools

import (
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"laftools-go/core/handlers/context"
	"laftools-go/core/project/base/form"
	"laftools-go/core/tools"
	"log"
	"os"

	"github.com/deatil/go-hash/hash"
	_ "github.com/mattn/go-sqlite3"

	"github.com/spf13/cobra"
)

// other things

// define a key-value map for FunctionMap
type FunctionMap = form.ExtensionFuncMap

var (
	arg_ReqFile    string
	arg_WCFile     string
	arg_ResultFile string
	arg_FnMap      string
	arg_Type       string
)

func Unused__InitCMD(cmd *cobra.Command) {
	cmd.PersistentFlags().StringVar(&arg_FnMap, "fn-map-id", "nil", "")
	cmd.PersistentFlags().StringVar(&arg_Type, "type", "nil", "what is your type?")
	cmd.PersistentFlags().StringVar(&arg_ReqFile, "req-file", "nil", "text request config in json format")
	cmd.PersistentFlags().StringVar(&arg_WCFile, "wc-file", "nil", "WebContext config in json format, it's coming from WebContext definition.")
	cmd.PersistentFlags().StringVar(&arg_ResultFile, "rs-file", "nil", "result")
}
func RunCMD(cmd *cobra.Command, args []string) {
	if arg_ReqFile == "nil" {
		cmd.Help()
		return
	}
	if arg_WCFile == "nil" {
		cmd.Help()
		return
	}
	var request form.ValueReq
	json_ReqFile, _ := tools.ReadFileAsStrWithNoTrim(arg_ReqFile)
	json_WCFile, _ := tools.ReadFileAsStrWithNoTrim(arg_WCFile)

	initTestDB()

	if arg_Type == "call-by-fn-map" {
		err := json.Unmarshal([]byte(json_ReqFile), &request)
		wc, err2 := context.NewWCFromJSON(json_WCFile)
		if err2 != nil {
			panic(err2)
		}
		var writeAnyToResultFile = func(any interface{}) {
			if arg_ResultFile != "nil" {
				// write to file
				bytes, _ := json.Marshal(any)
				fmt.Println(string(bytes))
			}
		}
		if err != nil {
			writeAnyToResultFile(form.ValueRes{
				Err:        err,
				OutputText: "unknown error handler",
				OutputFile: "",
			})
		} else {
			crtMap := GetAllFunctionMap(nil)[arg_FnMap]
			fmt.Println("wc is ", wc)
			rs := crtMap.ConvertText(request)
			tools.WriteObjectIntoFileWithMergeChecking(arg_ResultFile, rs)
		}
	}
}

func initTestDB() {
	// mkdir tools.CodeGenGoRoot+"/tmp
	tools.MkdirDir(tools.LafToolsAppBaseDir + "/tmp")

	db, err := sql.Open("sqlite3", tools.LafToolsAppBaseDir+"/tmp/test.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
	if err != nil {
		log.Fatal(err)
	}

	stmt, err := db.Prepare("INSERT INTO users(name) VALUES(?)")
	if err != nil {
		log.Fatal(err)
	}

	res, err := stmt.Exec("John Doe")
	if err != nil {
		log.Fatal(err)
	}

	lastID, err := res.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted user with ID:", lastID)

}

func GetAllFunctionMap(wc *context.WebContext) FunctionMap {
	if wc == nil {
		wc2, err2 := context.NewWCFromSystemDefault()
		tools.ShouldNoErr(err2, "Unknown error wc from system default")
		wc = wc2
	}
	// TODO: consider extra below function maps items into different files
	var fnmap FunctionMap = FunctionMap{
		"md2": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				GetMD2Str_tmp := func(str string) string {
					return hash.FromString(str).MD2().ToHexString()
				}
				return form.ValueRes{
					OutputText: GetMD2Str_tmp(request.InputText),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileMD2_tmp := func(request form.TextRequest) (string, error) {
					return FileMD2(request.InputFile)
				}
				md2, err := GetFileMD2_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: md2,
				}
			},
		},
		"md5": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				return form.ValueRes{
					OutputText: GetMD5ForText(form.TextRequest{
						InputText: request.InputText,
					}),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				md5, err := GetFileMD5(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: md5,
				}
			},
		},
		"md4": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				GetMD4Str_tmp := func(str string) string {
					return hash.FromString(str).MD4().ToHexString()
				}
				return form.ValueRes{
					OutputText: GetMD4Str_tmp(request.InputText),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileMD4_tmp := func(request form.TextRequest) (string, error) {
					return FileMD4(request.InputFile)
				}
				md4, err := GetFileMD4_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: md4,
				}
			},
		},
		"sha224": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				// func byte to hex string
				sha224 := sha256.New224()
				b := sha224.Sum([]byte(request.InputText))
				return form.ValueRes{
					OutputText: fmt.Sprintf("%x", b),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileSHA_tmp := func(request form.TextRequest) (string, error) {
					filePath := request.InputFile
					file, err := os.Open(filePath)
					if err != nil {
						return "", err
					}
					hash := sha256.New224()
					_, _ = io.Copy(hash, file)
					return hex.EncodeToString(hash.Sum(nil)), nil
				}
				sha, err := GetFileSHA_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: sha,
				}
			},
		},
		"sha384": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				// func byte to hex string
				sha384 := sha512.New384()
				b := sha384.Sum([]byte(request.InputText))
				return form.ValueRes{
					OutputText: fmt.Sprintf("%x", b),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileSHA_tmp := func(request form.TextRequest) (string, error) {
					filePath := request.InputFile
					file, err := os.Open(filePath)
					if err != nil {
						return "", err
					}
					hash := sha512.New384()
					_, _ = io.Copy(hash, file)
					return hex.EncodeToString(hash.Sum(nil)), nil
				}
				sha, err := GetFileSHA_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: sha,
				}
			},
		},
		"sha512": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				// func byte to hex string
				sha512 := sha512.New()
				b := sha512.Sum([]byte(request.InputText))
				return form.ValueRes{
					OutputText: fmt.Sprintf("%x", b),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileSHA_tmp := func(request form.TextRequest) (string, error) {
					filePath := request.InputFile
					file, err := os.Open(filePath)
					if err != nil {
						return "", err
					}
					hash := sha512.New()
					_, _ = io.Copy(hash, file)
					return hex.EncodeToString(hash.Sum(nil)), nil
				}
				sha, err := GetFileSHA_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: sha,
				}
			},
		},
		"sha256": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				// func byte to hex string
				sha256 := sha256.New()
				b := sha256.Sum([]byte(request.InputText))
				return form.ValueRes{
					OutputText: fmt.Sprintf("%x", b),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileSHA_tmp := func(request form.TextRequest) (string, error) {
					filePath := request.InputFile
					file, err := os.Open(filePath)
					if err != nil {
						return "", err
					}
					hash := sha256.New()
					_, _ = io.Copy(hash, file)
					return hex.EncodeToString(hash.Sum(nil)), nil
				}
				sha, err := GetFileSHA_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: sha,
				}
			},
		},
		"sha1": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				// func byte to hex string
				b := sha1.Sum([]byte(request.InputText))
				return form.ValueRes{
					OutputText: fmt.Sprintf("%x", b),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileSHA_tmp := func(request form.TextRequest) (string, error) {
					filePath := request.InputFile
					file, err := os.Open(filePath)
					if err != nil {
						return "", err
					}
					hash := sha1.New()
					_, _ = io.Copy(hash, file)
					return hex.EncodeToString(hash.Sum(nil)), nil
				}
				sha, err := GetFileSHA_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: sha,
				}
			},
		},
	}
	return fnmap
}
