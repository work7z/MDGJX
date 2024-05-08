// LafTools
// 
// Date: Fri, 8 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import info from '@/app/[lang]/[category]/info'
// write a full page component that has loading animation
// import ExtraLoadingBar from './ExtraLoadingBar'
import { getIconPngFileWithoutClient as getIconPngFileWithoutClient } from "@/app/[lang]/client/src/noclient";
import { CSS_BG_DARK_1ST } from '../../meta/styles';

export default function PageLoadingEffect() {
    return (
        <div className="w-full h-full absolute">
            <div className={
                "w-full h-full  z-50 absolute left-0 top-0  bg-slate-200  flex items-center justify-center " + CSS_BG_DARK_1ST
            }>
                {/* <div className="w-10 h-10 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div> */}
                <div className="text-center text-gray-500 dark:text-gray-100 space-y-[5px] flex items-center justify-center flex-col">
                    <div>
                        <img className="w-10 h-10 animate-pulse " src={"/static/" + getIconPngFileWithoutClient()}></img>
                    </div>
                    <div className="text- " style={{ fontSize: '10px' }}>LafTools {info.version}</div>
                    <div>
                        <div className="w-10 h-1 bg-green-500  rounded-full animate-pulse"></div>
                    </div>
                </div>
                {/* <ExtraLoadingBar /> */}
            </div>
        </div>
    )
}