// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package config

import "laftools-go/core/tools"

const CONFIG_URL_PUBLIC_BASE_PREFIX string = "/api"
const CLOUD_URL_APP_CLOUD_PREFIX string = "/x-v2-api"
const CONFIG_URL_OPENAPI_PREFIX string = "/open"
const CONFIG_URL_APP_FRONT_END_APP_PREFIX string = "/app"
const CONFIG_URL_APP_FRONT_END_STATIC_PREFIX string = "/static"
const CONFIG_URL_APP_FRONT_END_ASSETS_PREFIX string = "/assets"

// define an array for /blob, /arr
var CONFIG_CLOUD_URL_PREFIX []string = []string{
	"/blob",
}

// define an array for visit urls
var CONFIG_URL_VISIT_URLS []string = []string{
	//
}
var CONFIG_URL_ADMIN_URLS []string = []string{
	//
}

func Fn_GetAllowURLDefinitions() []string {
	urlList := []string{
		CONFIG_URL_APP_FRONT_END_APP_PREFIX,
		CONFIG_URL_APP_FRONT_END_STATIC_PREFIX,
		CONFIG_URL_APP_FRONT_END_ASSETS_PREFIX,
		CONFIG_URL_OPENAPI_PREFIX,
		"/system/getOneMotto",
		"/ws/", // websocket has own auth logic, no need to be checked here
	}
	// append CONFIG_URL_ADMIN_URLS and CONFIG_URL_ADMIN_URLS into filesList
	urlList = append(urlList, CONFIG_URL_VISIT_URLS...)
	if tools.IsDevMode {
		urlList = append(urlList, "/ws/dev-hmr")
	}
	return urlList
}

func FormatThatPathGlobally(relativePath string) string {
	return CONFIG_URL_PUBLIC_BASE_PREFIX + relativePath
}
