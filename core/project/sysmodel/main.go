// Date: Mon, 15 Jan 2024
// Author: Ryan Laf <work7z@outlook.com>
// Description:
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package sysmodel

import "time"

type UserConfig struct {
	Id             string
	Username       string
	Password       string
	Token          string
	CreateTime     time.Time
	IsAdmin        bool
	InvitationCode string
}
type UserConfigMap = map[string]UserConfig

type SystemInfo struct {
	HasAdminInit    bool      `json:"HasAdminInit"`
	LastUpdatedTime time.Time `json:"LastUpdatedTime"`
}
