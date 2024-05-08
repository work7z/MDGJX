// Date: Wed, 20 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package translation

import (
	"laftools-go/core/global"
	"laftools-go/core/log"
	"laftools-go/core/tools"
	"sync"

	//gftools "laftools-go/core/tools"
	"path"
	"strconv"
	"strings"

	"github.com/dablelv/cyan/conv"
)

const LANG_EN_US = "en_US"
const LANG_ZH_CN = "zh_CN"
const LANG_ZH_HK = "zh_HK"

type TraObject struct {
	lang string
}

type TranslatePassArg = []string

func TraSystemOnly() *TraObject {
	return &TraObject{
		lang: "en_US",
	}
}

func TraFromWeb(lang string) *TraObject {
	return &TraObject{
		lang: lang,
	}
}

var tmp_keyMap map[string]map[string]string = map[string]map[string]string{}

var previousLoadMap map[string]string = make(map[string]string, 1)

func loadFileByLangFromDir(pathname string, lang string) error {
	loadKey := pathname + lang
	if lang == "en" || lang == "en_US" {
		return nil
	}
	if _, found := previousLoadMap[loadKey]; found && !tools.IsDevMode {
		return nil
	}

	lockForPreloadLang.Lock()
	defer lockForPreloadLang.Unlock()
	tFile := path.Join(pathname, lang+".json")
	if !tools.IsFileExist(tFile) {
		log.Ref().Warn("has no config file for lang: " + tFile)
		return nil
	}
	tmpLangObj, err := tools.ReadJSONFile(tFile)
	if err != nil {
		log.Ref().Fatal("LoadFromDir: ", err.Error())
		return err
	}

	for key, value := range tmpLangObj {
		if _, has := tmp_keyMap[lang]; !has {
			tmp_keyMap[lang] = map[string]string{}
		}
		tmp_keyMap[lang][key] = value
	}

	previousLoadMap[loadKey] = "1"
	return nil
}

func LoadFromDir(pathname string) error {
	lockForLoadLang.Lock()
	defer lockForLoadLang.Unlock()
	// do nothing here
	return nil
	// // TODO: in the future, we will provide more languages instead of hard code
	// // read all zh_CN.json and zh_HK.json in this directory and load them into tmp_keyMap(not replace but patch)
	// // if the key is already exist, then skip it
	// // if the key is not exist, then add it
	// // if the key is exist but the value is empty, then replace it
	// // if the key is exist but the value is not empty, then skip it
	// // if the key is not exist, then add it
	// var err error = nil

	// type LangIterator struct {
	// 	lang string
	// }
	// var list = []LangIterator{
	// 	{
	// 		lang: LANG_ZH_CN,
	// 	},
	// 	{
	// 		lang: LANG_ZH_HK,
	// 	},
	// }
	// for _, langIterator := range list {
	// }
	// if err != nil {
	// 	log.Ref().Fatal("LoadFromDir: ", err.Error())
	// 	return err
	// }
	// return nil
}

// lockForLoadLang for tmp_keyMap lockForLoadLang
var lockForLoadLang = &sync.Mutex{}
var lockForPreloadLang = &sync.Mutex{}

// SKIP_DOT
func (t *TraObject) Dot(id string, enUS string, arg ...interface{}) string {
	lockForLoadLang.Lock()
	defer lockForLoadLang.Unlock()
	// load from files when needed
	lang := t.lang
	log.Ref().Debug("Dot: ", lang, ", id:"+id+" -> ", enUS)

	// preload other folders by array
	otherFolders := []string{
		global.GetPureJSLangFolder(),
		global.GetLangDir(),
	}

	for _, folder := range otherFolders {
		log.Ref().Debug("load folder: ", folder)
		loadFileByLangFromDir(folder, lang)
	}

	var newText = id
	var ack bool = false
	if lang == "" || lang == LANG_EN_US {
		newText = enUS
		ack = true
	} else {
		translationConfigObj := tmp_keyMap[lang]
		// if translationConfigObj == nil || tools.IsDevMode {
		// 	var err2 error = nil
		// 	selfLang := path.Join(global.GetLangDir(), lang+".json")
		// 	log.Ref().Debug("load file: ", selfLang)
		// 	translationConfigObj, err2 = tools.ReadJSONFile(selfLang)
		// 	if err2 != nil {
		// 		log.Ref().Fatal("No available text for the id "+id, err2)
		// 	} else {
		// 		// merge translationConfigObj into tmp_keyMap[lang]
		// 		for key, value := range translationConfigObj {
		// 			if _, has := tmp_keyMap[lang]; !has {
		// 				tmp_keyMap[lang] = map[string]string{}
		// 			}
		// 			tmp_keyMap[lang][key] = value
		// 		}
		// 	}
		// 	translationConfigObj = tmp_keyMap[lang]
		// }
		value, has := translationConfigObj[id]
		if has {
			pText := strings.ReplaceAll(value, "''", "'")
			if pText != "" {
				ack = true
				newText = pText
				ack = true
			}
		} else {
			log.Ref().Warning("No available text for the id " + id)
			// return enUS + "[UNTRANSLATED]"
			return enUS
		}
	}

	if !ack {
		log.Ref().Warning("No available text for the id " + id)
	} else {
		for idx, idxVal := range arg {
			idxVal2, errParsing := conv.ToStringE(idxVal)
			if idxVal == nil || errParsing != nil {
				continue
			}
			replaceText := "{" + strconv.Itoa(idx) + "}"
			log.Ref().Debug("new text: "+newText, "len(arg)", len(arg))
			log.Ref().Debug("replace text: "+replaceText+", idxVal ", idxVal)
			newText = strings.ReplaceAll(newText, replaceText, idxVal2)
		}
		// log.Ref().Debug("Dot: ", id+" -> ", newText)
	}
	return newText

}
