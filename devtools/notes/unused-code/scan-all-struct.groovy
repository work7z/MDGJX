package com.internal.denote.testing.golang

import com.sun.org.apache.xalan.internal.xsltc.compiler.Pattern

class ScanAllStructs {
    static void main(String[] args) {
/**
 * 1. enter the directry /Users/jerrylai/mincontent/PersonalProjects/LafTools-go/core
 * 2. recursively find all go source code files
 * 3. use regex pattern to match the content of golang struct
 * 4. convert their fields in Go struct like typescript type definition
 */
        def dir = "$LAFTOOLS_ROOT/core"
        // compile a regex that can match the body of Go type struct definition
        def regex = /type\s+\w+\s+struct\s+\{[\s\S]*?\}/
        def str = """

type TextProcessAction struct {
	Id           string
	Label        string
	ProcessValue func(TextRequest) TextResponse
}

type TextProcessForm struct {
	Id                     string
	Label                  string
	Categories 		   []string
	Description            string
	Action                 []*TextProcessAction
	LoaderVariableMap      map[string]interface{}
	LoaderConfigJSON       string // to retrieve this value, please ensure you call load JSON config
	LoaderConfigJavaScript string
}

func FormatContentWithinForm(form *TextProcessForm, newStr string) string {
	if form.LoaderVariableMap != nil {
		for s, i := range form.LoaderVariableMap {
			newStr = strings.ReplaceAll(newStr, "@{"+s+"}", nocycle.ToAnyString(i))
		}
	}
	return newStr
}
"""
        str.eachMatch(regex) { m ->
            println(m[0])
        }
    }
}
