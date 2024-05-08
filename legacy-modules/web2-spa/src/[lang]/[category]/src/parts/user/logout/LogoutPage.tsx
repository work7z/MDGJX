'use client'

import React, { useEffect } from 'react'
import GrailLayoutWithUser from '@/__CORE__/containers/GrailLayoutWithUser'
import { AuthInfoProps, } from '@/[lang]/page'
import CardPanel from '@/__CORE__/components/CardPanel';
import '@/__CORE__/script/preline-init'

import { getWebsiteName } from '@/__CORE__/common/config';
import LanguagePicker from '@/__CORE__/containers/LanguagePicker';
import LoadingWrapper from '@/__CORE__/containers/LoadingWrapper';


import _ from 'lodash';
import { loadDOT, useTTT2 } from '../register/i18n-types';
import { Dot } from '@/__CORE__/utils/cTranslationUtils';

function deleteAllCookies() {
    document.cookie = ''
}
let a = loadDOT("AsgwGFZldg")
export default (p: AuthInfoProps) => {
    a()

    useEffect(() => {
        deleteAllCookies()
        localStorage.clear()
        location.href = '/'
    }, [])
    return (
        <div className='space-y-2 flex-1'>
            <CardPanel className='p-2 min-h-8'>
                <div>
                    {Dot("lOdrxd__", "Okay, you have logged out. We will redirect you to the home page in a few seconds.")}
                </div>
            </CardPanel>
        </div>
    )
}
