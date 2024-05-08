// Date: Tue, 19 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"laftools-go/core/handlers/context"
	"laftools-go/core/log"

	"github.com/gin-gonic/gin"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func statsSystem(c *gin.Context) {
	webContext := context.WebContext{GinContext: c}
	log.Ref().Info(webContext.Dot("m10344", "Test Example like {0}", "LafTools"))
	OKLa(c, DoValueRes(timestamppb.Now()))
}
