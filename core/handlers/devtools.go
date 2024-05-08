// Date: Mon, 20 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/gin-gonic/gin"
)

var url_feProxyPath = "http://localhost:5173"

func proxyToDevFE(c *gin.Context, prefix string) {
	allPath := c.Request.URL.Path
	// read the file in feAppDir and pipe its content into c
	subFilePath := strings.Replace(allPath, prefix, "", 1)
	remoteFullPath := url_feProxyPath + subFilePath

	r := c.Request
	w := c.Writer
	proxy := NewSingleHostReverseProxyWithNoHeader(remoteFullPath)
	r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))

	proxy.ServeHTTP(w, r)
}

func NewSingleHostReverseProxyWithNoHeader(target string) *httputil.ReverseProxy {
	targetUrl, _ := url.Parse(target)
	return &httputil.ReverseProxy{Director: func(r *http.Request) {
		r.URL.Host = targetUrl.Host
		r.URL.Scheme = targetUrl.Scheme
		r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))
		r.Host = targetUrl.Host
	}}
}
