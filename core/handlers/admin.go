// Date: Tue, 10 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"errors"
	translation "laftools-go/core/i18n"

	"github.com/gin-gonic/gin"
)

func ResetPasswordByAdmin(c *gin.Context) {
	c.Error(errors.New(translation.TraSystemOnly().Dot("2106", "Wait to be completed.")))
}
