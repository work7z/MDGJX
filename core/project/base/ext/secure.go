// Date: Thu, 12 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
//
// License: AGPLv3

package ext

import (
	"laftools-go/core/handlers/context"
	"laftools-go/core/project/base/form"
)

func FN_GetSHA224Form(ctx *context.WebContext) *form.ExtensionVM {
	return nil
	// return &form.ExtensionVM{
	// 	Layout: "form",
	// 	Actions: &[]form.ExtensionAction{
	// 		{
	// 			Id:           "sha224.text",
	// 			Tooltip:      ctx.Dot("PJNze", "Click here to encrypt your input text"),
	// 			Label:        ctx.Dot("o3poi.sha224", "SHA224 from Text"),
	// 			CallFuncList: []string{"sha224.ConvertText"},
	// 		},
	// 		{
	// 			Id:           "sha224.file",
	// 			Tooltip:      ctx.Dot("wqp_4", "Click here to select a file and directly encrypt it."),
	// 			Label:        ctx.Dot("gwo79.sha224", "SHA224 from File"),
	// 			CallFuncList: []string{"sha224.ConvertFile"},
	// 		},
	// 	},
	// 	Info: &form.ExtensionInfo{
	// 		Id: "sha224",

	// 		Label:       ctx.Dot("TtyeA.sha224", "SHA224"),
	// 		Description: ctx.Dot("gh9zA.sha224", "SHA-224 is a cryptographic hash function that takes an input and produces a 224-bit (28-byte) hash value. It is part of the SHA-2 family of hash functions, which also includes SHA-256, SHA-384, and SHA-512. SHA-224 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. SHA-224 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical."),
	// 	},
	// }
}

func FN_GetSHA384Form(ctx *context.WebContext) *form.ExtensionVM {
	// return &form.ExtensionVM{
	// 	Actions: &[]form.ExtensionAction{
	// 		{
	// 			Id:           "sha384.text",
	// 			Label:        ctx.Dot("o3poi.sha384", "SHA384 from Text"),
	// 			Tooltip:      ctx.Dot("E88Ej", "Click here to encrypt your input text"),
	// 			CallFuncList: []string{"sha384.ConvertText"},
	// 		},
	// 		{
	// 			Id:           "sha384.file",
	// 			Label:        ctx.Dot("gwo79.sha384", "SHA384 from File"),
	// 			CallFuncList: []string{"sha384.ConvertFile"},
	// 		},
	// 	},
	// 	Info: &form.ExtensionInfo{
	// 		Id: "sha384",

	// 		Label:       ctx.Dot("TtyeA.sha384", "SHA384"),
	// 		Description: ctx.Dot("gh9zA.sha384", "SHA-384 is a cryptographic hash function that takes an input and produces a 384-bit (48-byte) hash value. It is part of the SHA-2 family of hash functions, which also includes SHA-224, SHA-256, SHA-512, SHA-512/224, and SHA-512/256. SHA-384 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. SHA-384 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical."),
	// 	},
	// }
	return nil
}
func FN_GetSHA512Form(ctx *context.WebContext) *form.ExtensionVM {
	// return &form.ExtensionVM{
	// 	Actions: &[]form.ExtensionAction{
	// 		{
	// 			Id:           "sha512.text",
	// 			Tooltip:      ctx.Dot("pl8S6", "Click here to encrypt your input text"),
	// 			Label:        ctx.Dot("o3poi.sha512", "SHA512 from Text"),
	// 			CallFuncList: []string{"sha512.ConvertText"},
	// 		},
	// 		{
	// 			Id:           "sha512.file",
	// 			Label:        ctx.Dot("gwo79.sha512", "SHA512 from File"),
	// 			CallFuncList: []string{"sha512.ConvertFile"},
	// 		},
	// 	},
	// 	Info: &form.ExtensionInfo{
	// 		Id: "sha512",

	// 		Label:       ctx.Dot("TtyeA.sha512", "SHA512"),
	// 		Description: ctx.Dot("gh9zA.sha512", "SHA-512 is a cryptographic hash function that takes an input and produces a 512-bit (64-byte) hash value. It is part of the SHA-2 family of hash functions, which also includes SHA-224, SHA-256, SHA-384, SHA-512/224, and SHA-512/256. SHA-512 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. SHA-512 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical."),
	// 	},
	// }
	return nil
}

func FN_GetSHA256Form(ctx *context.WebContext) *form.ExtensionVM {
	return nil
}

func FN_GetSHA1Form(ctx *context.WebContext) *form.ExtensionVM {
	return nil
}

func FN_GetMD4Form(ctx *context.WebContext) *form.ExtensionVM {
	return nil
}

func FN_GetMD2Form(ctx *context.WebContext) *form.ExtensionVM {
	return nil
}

func FN_GetMD5Form(ctx *context.WebContext) *form.ExtensionVM {
	return nil
}
