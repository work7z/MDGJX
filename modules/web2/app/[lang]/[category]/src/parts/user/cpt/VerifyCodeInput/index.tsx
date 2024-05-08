'use client'

import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { loadDOT } from '@/app/__CORE__/utils/i18n-for-load';
import { Dot, getCurrentLang } from '@/app/__CORE__/utils/cTranslationUtils';
import os from 'os'
import path from 'path';
import { readFileSync } from 'fs';
import { webaction_sendAPIRequestInBE } from '@/app/[lang]/client/src/api/ApiUtils';
import { URL_AUTH_GET_CAPTCHA } from '@/app/__CORE__/share/server_urls';
import { SysResponse, TypeCaptchaResponse } from '@/app/__CORE__/share/server_constants';
import { Button, Callout } from '@blueprintjs/core';

let a = loadDOT("lAz69eiBk")

export default (props: { codeImgBase64?: string, vcodeFactor: number }) => {
    a()
    let [ts, onTS] = React.useState(Date.now())
    let [base64, onBase64] = useState("")
    let [randomID, onRandomID] = useState("")
    let [loading, onLoading] = useState(false)
    let [errMsg, onErrMsg] = useState("")
    let update_base64 = async () => {
        try {
            onErrMsg("")
            onLoading(true)
            let r = await webaction_sendAPIRequestInBE({
                lang: getCurrentLang()
            }, URL_AUTH_GET_CAPTCHA)
            let rJSON = JSON.parse(r) as SysResponse<TypeCaptchaResponse>
            onBase64(rJSON.content.imgBase64)
            onRandomID(rJSON.content.randomID)
            onLoading(false)
        } catch (e) {
            onLoading(false)
            console.error(e)
            onErrMsg("Error: " + _.toString(e))
        }
    }
    useEffect(() => {
        (update_base64)()
    }, [props.vcodeFactor])

    return (
        <div className="min-w-[350px]">

            <label className="block text-sm mb-2 dark:text-white w-full ">{Dot("ChsJp", "CAPTCHA")}</label>
            <div className="relative">
                <input name='vcode' id="hs-toggle-password" type="text" className="py-3 px-4 block w-full border-gray-200  border-[1px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder={Dot("fnV5h", "Enter Image Verification Code")} />
            </div>
            <div className='mt-2'>
                {
                    loading ? <div className='w-full min-h-20'>
                        {'Loading...'}
                    </div> : (
                        <img id='vcode' data-randomid={randomID} className='hover:cursor-pointer min-h-20 min-w-[1/5] bg-slate-300' src={"data:image/png;base64," + base64} onClick={() => {
                            update_base64()
                        }}  ></img>
                    )
                }
                <div className='text-right'>
                </div>
            </div>
            <div className='hidden'>
                <input name='randomID' value={randomID} />
            </div>
            {
                errMsg ? <div>
                    <Callout intent='danger'>{errMsg}<br />
                        <Button small text={Dot("vfIT0KsJ0", "Re-try")} intent={"none"} onClick={() => {
                            update_base64()
                        }} ></Button>
                    </Callout>
                </div> : ''
            }
        </div>
    )
}