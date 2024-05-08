// Date: Tue, 19 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package menu

import (
	"encoding/json"
	"io/ioutil"
	"laftools-go/core/global"
	"laftools-go/core/log"
	"path/filepath"
)

type Menu struct {
	Root     bool   `json:"root"`
	Label    string `json:"label"`
	Icon     string `json:"icon"`
	Id       string `json:"id"`
	Children []Menu `json:"children"`
}

var previousMenu *Menu = nil

func GetMenuArr() (*Menu, error) {
	if previousMenu != nil {
		return previousMenu, nil
	}
	menuJSONStrB, err := ioutil.ReadFile(filepath.Join(global.GetResourceNonProhibitedDir(), "menu.json"))
	if err != nil {
		return nil, err
	} else {
		var item Menu
		err = json.Unmarshal(menuJSONStrB, &item)
		if err != nil {
			return nil, err
		}
		log.Ref().Info("Menu: ", item)
		previousMenu = &item
		return &item, nil
	}
}
