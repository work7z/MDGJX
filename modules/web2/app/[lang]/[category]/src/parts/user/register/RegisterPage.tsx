'use client'

import React, { useState } from 'react'
import GrailLayoutWithUser from '@/app/__CORE__/containers/GrailLayoutWithUser'
import CardPanel from '@/app/__CORE__/components/CardPanel';
import TwTabs from '@/app/__CORE__/components/TwTabs'
import '@/app/__CORE__/script/preline-init'
import { Metadata, ResolvingMetadata } from 'next';
import { getWebsiteName } from '@/app/__CORE__/common/config';
import { useFormState } from 'react-dom'
import LoadingWrapper from '@/app/__CORE__/containers/LoadingWrapper';
import AlertErrorPanel from '@/app/__CORE__/containers/AlertErrorPanel';
import { loadDOT, useTTT2 } from './i18n-types';
import { Dot } from '@/app/[lang]/client/src/utils/cTranslationUtils';
import UsernameInput from '../cpt/UsernameInput';
import GeneralInput from '../cpt/GeneralInput';
import PhoneInput from '../cpt/PhoneInput';
import PasswordInput from '../cpt/PasswordInput';
import VerifyCodeInput from '../cpt/VerifyCodeInput';
import EmailInput from '../cpt/EmailInput';

let a = loadDOT("TLIwAn4K1")

export default function RegisterPage(props: { passClz: string }) {
    a()
    let [errMsg, setErrMsg] = React.useState<string[]>([])
    let [vcodeFactor, onVCodeFactor] = useState(0)
    let [working, setWorking] = useState(false)
    let [pw, setPw] = useState('')
    return <LoadingWrapper><form className='' method="POST" onSubmit={async e => {
        e.preventDefault();
        setErrMsg([])
        // get form data 
        let formData = new FormData(e.target as HTMLFormElement);
        try {
            setWorking(true)
            let userAcctId = formData.get("userAcctId")?.toString() || ''
            if (userAcctId.indexOf(" ") >= 0) {
                setErrMsg([Dot("IhRA4d5c", "User ID cannot contain space.")])
                window.scrollTo(0, 0)
                return;
            }
            if (userAcctId.length < 2) {
                setErrMsg([Dot("IhRA45c", "User ID must be at least 2 characters.")])
                window.scrollTo(0, 0)
                return;
            }
            if (true) {
                for (let preview of [true, false]) {
                    // let v = await create({
                    //     preview: preview,
                    //     userAcctId: userAcctId,
                    //     password: formData.get("password")?.toString() || '',
                    //     phoneNumber: formData.get("phoneNumber")?.toString() || '',
                    //     confirmPassword: formData.get("confirmPassword")?.toString() || '',
                    //     vcode: formData.get("vcode")?.toString() || '',
                    //     invitationCode: formData.get("invitationCode")?.toString() || '',
                    // })
                    // if (v.error) {
                    //     onVCodeFactor(Date.now())
                    //     setErrMsg([v.error || ''])
                    //     window.scrollTo(0, 0)
                    //     return;
                    // };
                    // if (preview) {
                    //     if (!window.confirm(Dot("flId5c", "Are you sure to register with this user ID <{0}>? It cannot be changed once you confirm the user ID.", userAcctId))) {
                    //         throw new Error(Dot("IuH4gxwH4", 'User cancelled'))
                    //     }
                    //     continue;
                    // }
                }
                location.href = '/activation'
            }
        } catch (e: any) {
            setErrMsg([e.message || ''])
            window.scrollTo(0, 0)
        } finally {
            setWorking(false)
        }
    }}  >
        <CardPanel className={'p-4 py-8 ' + props.passClz}>
            <div className='mx-20 '>
                <div className='text-2xl mb-4 font-bold'>
                    {Dot("yOwdRB", "Create an Account")}
                </div>
                <AlertErrorPanel errorMsg={errMsg}></AlertErrorPanel>

                <div className='space-y-2 mt-4 max-w-md'>
                    <div className='mb-2'>
                    </div>
                    <UsernameInput checkDuplicate={true} name='userAcctId' />
                    {/* <GeneralInput fn_svgJSX={
                        (clz: string) =>
                            <svg className={clz} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                            </svg>
                    } label={Dot("39dIhsVvd", "Invitation Code")} name='invitationCode' ph={Dot("lcMhf", "This community is invite-only.")}></GeneralInput> */}
                    <EmailInput name='phoneNumber'></EmailInput>
                    <PasswordInput name='password' strongMode></PasswordInput>
                    <PasswordInput name='confirmPassword' label={Dot("TXh_K", "Confirm Password")} ph={Dot("sfooX", "Confirm your password")}></PasswordInput>
                    <VerifyCodeInput vcodeFactor={vcodeFactor} codeImgBase64={''}></VerifyCodeInput>
                    <div className='clearfix  clear-none'></div>
                    <div className='pt-6'>
                        <button disabled={working} type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-solarized-base02Light5 text-white hover:bg-solarized-base02Light3 transition-all disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            {Dot("register", "Register Now")}
                        </button>
                    </div>
                    <div className=' text-right text-sm space-x-2'>
                        <span>                        {Dot("3Lfbe", "Already Have an Account?")}</span>
                        <a className='anchor-text text-sm' href="./sign-in">
                            {Dot("wOpCO", "Click to Login", "")}
                        </a>
                    </div>


                </div>
            </div>
        </CardPanel>
    </form>
    </LoadingWrapper >
}

