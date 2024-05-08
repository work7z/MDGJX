// Date: Sat, 16 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package extra

import (
	"bufio"
	"fmt"
	"laftools-go/core/global"
	"laftools-go/core/log"
	"laftools-go/core/project/base/env"
	"laftools-go/core/tools"
	"os"
	"os/exec"
	"strings"

	"github.com/spf13/cobra"
)

type Job struct {
	Name     string   `json:"Name"`
	Type     string   `json:"Type"`
	Disabled bool     `json:"Disabled"`
	Commands []string `json:"Commands,omitempty"`
}

type Config struct {
	Env       []string `json:"Env"`
	LockFile  bool     `json:"LockFile"`
	OutputDir string   `json:"OutputDir"`
	Jobs      []Job    `json:"Jobs"`
}

var ConfigFilePath string

func HandleExtraAction(cmd *cobra.Command, args []string) {
	env.ShouldPrintLogAsJSON = false
	log.Ref().Debug("calling extra action")
	ConfigFilePath = strings.ReplaceAll(ConfigFilePath, "$LAFTOOLS_ROOT", env.GetEnvValueForLafToolsRoot())
	log.Ref().Debug("DefaultConfigFile: ", ConfigFilePath)
	lckFile := ConfigFilePath + ".lck"
	log.Ref().Debug("lckFile: ", lckFile)
	// write uuid into lckFile, and keep that uuid. once the uuid is not matched with lckFile, then exit
	crtUUID := global.UUID()
	log.Ref().Debug("crtUUID: ", crtUUID)
	tools.WriteStrIntoFile(lckFile, crtUUID)
	go func() {
		for {
			// read uuid from lckFile, and compare with crtUUID
			// if not matched, then exit
			// if matched, then sleep 2s
			if tools.IsFileExist(lckFile) {
				uuid := tools.ReadFileAsString(lckFile)
				if uuid != crtUUID {
					log.Ref().Debug("uuid not matched, exit")
					tools.Exit(0)
				}
			} else {
				log.Ref().Debug("lckFile not exist, exit")
				tools.Exit(0)
			}
			tools.Sleep(2000)
		}
	}()

	crtConfig := Config{}
	// unmarshal DefaultConfigFile into crtConfig
	e := tools.ReadFileAsJson(ConfigFilePath, &crtConfig)
	if e != nil {
		log.Ref().Debug("read config file failed, exit")
		tools.Exit(0)
	}
	// log.Ref().Debug("crtConfig: ", crtConfig)
	// run commands for each job, remember to set env, and print output to the folder OutputDir
	for _, job := range crtConfig.Jobs {
		if job.Disabled {
			continue
		}
		// set env
		go func(job Job) {
			// if strings.Index(job.Name, "Scan") == -1 {
			// return
			// }
			log.Ref().Debug("job: ", job)
			// for each job.Commands, and replace their value with env
			for _, env := range crtConfig.Env {
				for idx, eachCmd := range job.Commands {
					eachCmd = strings.ReplaceAll(eachCmd, "$"+env, os.Getenv(env))
					job.Commands[idx] = eachCmd
				}
			}

			// trigger command by go command
			mainProgram := job.Commands[0]
			extArr := make([]string, 0)
			extArr = job.Commands[1:]
			cmd := exec.Command(mainProgram, extArr...)
			// get all output in cmd as a string, and convert it as NodeRes struct, note that return error if any
			// add env into cmd
			cmd.Env = os.Environ()

			log.Ref().Debug("cmd is ", extArr)

			// var out bytes.Buffer
			// var stderr bytes.Buffer
			// cmd.Stdout = &out
			// cmd.Stderr = &stderr

			stdout, _ := cmd.StdoutPipe()
			stderr, _ := cmd.StderrPipe()

			go func() {
				scanner := bufio.NewScanner(stdout)
				for scanner.Scan() {
					fmt.Println(scanner.Text()) // or send to a logger, etc.
				}
			}()

			go func() {
				scanner := bufio.NewScanner(stderr)
				for scanner.Scan() {
					fmt.Println(scanner.Text()) // or send to a logger, etc.
				}
			}()

			err := cmd.Start()
			if err != nil {
				log.InternalLog.Warn(err)
				// log.InternalLog.Fatal(err)
				// os.Exit(99)
			}

			err = cmd.Wait()
			if err != nil {
				log.InternalLog.Warn(err)
				// log.InternalLog.Fatal(err)
				// os.Exit(99)
			}

			// err := cmd.Run()
			// if err != nil {
			// 	errValue := fmt.Sprint(err) + ": " + stderr.String()
			// 	log.Ref().Debug("could not execute cmd.output", errValue, " and output is ", out)
			// 	os.Exit(99)
			// }
			// outStr := out.String()
			// log.Ref().Debug("cmd.output is ", outStr)
		}(job)
	}
	select {}
}
