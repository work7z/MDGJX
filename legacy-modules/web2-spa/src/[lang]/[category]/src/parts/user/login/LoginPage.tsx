'use client'

import React, { useState } from 'react'
import GrailLayoutWithUser from '@/__CORE__/containers/GrailLayoutWithUser'
import CardPanel from '@/__CORE__/components/CardPanel';
import TwTabs from '@/__CORE__/components/TwTabs'
import '@/__CORE__/script/preline-init'

import LoadingWrapper from '@/__CORE__/containers/LoadingWrapper';
import AlertErrorPanel from '@/__CORE__/containers/AlertErrorPanel';
import { loadDOT, useTTT, useTTT2 } from '../register/i18n-types';
import { Dot, getCurrentLang } from '@/__CORE__/utils/cTranslationUtils';
import PhoneInput from '../cpt/PhoneInput';
import PasswordInput from '../cpt/PasswordInput';
import UsernameInput from '../cpt/UsernameInput';
import VerifyCodeInput from '../cpt/VerifyCodeInput';
import { core_sendAPIRequestInBE } from '@/__CORE__/share-spa/api';
import { webaction_sendAPIRequestInBE } from '@/[lang]/client/src/api/ApiUtils';
import { URL_AUTH_GET_SIGNIN } from '@/__CORE__/share-spa/server_urls';
import { satisfies } from 'semver';
import { AsyncCreateResponse, SignInCredentials, SysResponse } from '@/__CORE__/share-spa/server_constants';
import AlertUtils from '@/[lang]/client/src/utils/AlertUtils';
import { OverlayToaster, Toaster } from '@blueprintjs/core';
import { fmtURL_Client } from '@/__CORE__/utils/cRouteUtils';

let lt = loadDOT("c216jAeDW")

// write LoginPage for including phone number and password
export default function LoginPage(props: { passClz: string, type: string }) {
    let [vcodeFactor, onVCodeFactor] = useState(0)
    let [errMsg, setErrMsg] = React.useState<string[]>([])
    let [working, setWorking] = useState(false)
    let [pw, setPw] = useState('')
    lt()
    let type = props.type || 'username'
    return <LoadingWrapper>

        <form className='' onSubmit={async (e) => {
            e.preventDefault();
            setErrMsg([])
            // get form data 
            let formData = new FormData(e.target as HTMLFormElement);
            try {
                AlertUtils.popMsg("none", {
                    message: Dot("UV_6mHKy7", "We are working on this, moments please")
                })
                setWorking(true)
                let userAcctId = formData.get("userAcctId")?.toString() || ''
                let rText = await webaction_sendAPIRequestInBE(
                    {
                        lang: getCurrentLang(),
                        isPOST: true,
                        body: {
                            userAcctId: userAcctId,
                            password: formData.get("password")?.toString() || '',
                            randomID: formData.get("randomID")?.toString() || '',
                            vcode: formData.get("vcode")?.toString() || '',
                        }
                    },
                    URL_AUTH_GET_SIGNIN,
                )
                let rObj = JSON.parse(rText) as SysResponse<AsyncCreateResponse<SignInCredentials>>
                if (rObj.content.error) {
                    onVCodeFactor(Date.now())
                    throw new Error(rObj.content.error)
                } else {
                    let data = rObj.content.data
                    if (data) {
                        if (!data.signed) {
                            onVCodeFactor(Date.now())
                            throw new Error(Dot("eqdp8qhRA", "Sorry, unable to proceed your request."))
                        } else {
                            AlertUtils.popOK(Dot("k5UwCvXOE", "Signed in the system successfully, will redirect you to home page."))
                            window.scrollTo(0, 0)
                            location.href = fmtURL_Client(["/"])
                        }
                    }
                }
            } catch (e: any) {
                AlertUtils.popMsg("danger", {
                    message: e.message
                })
                window.scrollTo(0, 0)
            } finally {
                setWorking(false)
            }
        }}>
            <CardPanel className={'p-4 py-8 mt-12' + props.passClz}>
                <div className='mx-20 '>
                    <div className='text-2xl mb-4 font-bold'>
                        {Dot("oeaSx7ir8", "Welcome back to LafTools")}
                    </div>

                    <div className='space-y-2 mt-4 max-w-md'>
                        <div className='hidden'>
                            <input name="type" value={type} ></input>
                        </div>
                        {
                            type == 'username' ? <UsernameInput placeholder={
                                Dot("plzhdhqqG", "Please provide username or Email")
                            } checkIfHas name='userAcctId'></UsernameInput> :
                                <PhoneInput name='phoneNumber' />
                        }
                        <PasswordInput name='password'></PasswordInput>
                        <div className=' text-right'>
                            <a className='anchor-text text-sm' href="./reset-password">
                                {Dot("dKfY3I", "Forgot password?")}
                            </a>
                        </div>
                        <VerifyCodeInput vcodeFactor={vcodeFactor} codeImgBase64={''}></VerifyCodeInput>
                        <div className='clearfix  clear-none'></div>
                        <div className='pt-6'>
                            <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent transition-all bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                {Dot("Sa-gP", "Sign In")}
                            </button>
                        </div>
                        <div className=' text-right text-sm space-x-2'>
                            <span>{Dot("newtoelb", "New to {0}?", 'LafTools')}</span>
                            <a className='anchor-text text-sm' href={'./sign-up'}>
                                {Dot("9gzkh", "Create New Account", "")}
                            </a>
                        </div>
                    </div>
                </div>

            </CardPanel>
        </form>
        {/* <AlertErrorPanel errorMsg={errMsg}></AlertErrorPanel> */}

    </LoadingWrapper>
}
