// Date: Sat, 6 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package handlers

import (
	"laftools-go/core/log"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/gin-gonic/gin"
)

func proxyToCloud(c *gin.Context) {
	// reverse proxy to this request to https://laftools.dev

	// define
	// var mainhost = "https://laftools.dev"
	var mainhost = "https://laftools.dev" //  "http://192.168.1.3:8080"
	// var prefix = config.CLOUD_URL_APP_CLOUD_PREFIX
	// process proxy
	allPath := c.Request.URL.Path
	// read the file in feAppDir and pipe its content into c
	// subFilePath := strings.Replace(allPath, prefix, "", 1)
	remoteFullPath := mainhost + allPath // subFilePath

	r := c.Request
	w := c.Writer
	proxy := NewSingleHostReverseProxyWithHeader(remoteFullPath, c)
	log.Ref().Debugf("proxyToCloud: %s", remoteFullPath)
	proxy.ServeHTTP(w, r)
}

func NewSingleHostReverseProxyWithHeader(target string, c *gin.Context) *httputil.ReverseProxy {
	targetUrl, _ := url.Parse(target)
	return &httputil.ReverseProxy{Director: func(r *http.Request) {
		r.URL.Host = targetUrl.Host
		r.URL.Scheme = targetUrl.Scheme
		r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))
		// copy headers from c to r
		for k, vv := range c.Request.Header {
			for _, v := range vv {
				log.Ref().Debugf("- Header: %s: %s", k, v)
				r.Header.Add(k, v)
			}
		}
		r.Host = targetUrl.Host
	}}
}
