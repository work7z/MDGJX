// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { getPureWebsiteName } from "@/app/__CORE__/common/config"
import { Dot, } from "@/app/__CORE__/utils/TranslationUtils"
// import { Tooltip as ReactTooltip } from "react-tooltip";
// import 'react-tooltip/dist/react-tooltip.css'
import NoSsr from "@/app/__CORE__/components/NoSsr";
import dynamic from 'next/dynamic'
import HomeLink from "../../components/HomeLink";
import SearchBar from "./SearchBar";
import { useIsLoggedIn } from "../../hooks/user";
import { fmtURL_Server as fmtURL_Server } from "../../utils/routeUtils";
import { getAppDevIcon } from "../../config/imgconfig";


export let TopNav = (props: any) => {

    let isLoginIn = props.authInfo.signedIn

    let homeItem = { name: Dot("UjkOS50wO", "Home"), href: "/" }
    let chatGroupItem = { name: Dot("groupnote", "Memo"), href: "/group" }
    let links: { name: string, href: string }[] = []
    return (
        <div className="border-b-2  dark:border-solarized-green dark:border-opacity-80  " >
            <div className="flex items-center justify-between flex-wrap p-4 border-b-slate-300  mx-auto app-minmax-size pl-6  " style={{
            }}>
                <div className="flex items-center flex-shrink-0 mr-8">
                    <img src={`/${getAppDevIcon(true)}`} alt="logo" className="fill-current h-8 w-22 mr-2 rounded-sm border-zinc-100  shadow-sm " />
                    <HomeLink>
                        <span data-tooltip-id="my-tooltip-1" className="ml-1 font-semibold text-xl tracking-tight">{getPureWebsiteName()}</span>
                    </HomeLink>
                    <SearchBar></SearchBar>
                </div>
                <div className="  flex-grow lg:flex lg:items-center lg:w-auto flex justify-end">
                    <div>
                        {links.map(x => {
                            return (
                                <a href={x.href} className="inline-block hover:opacity-70 text-lg px-4 py-2 leading-none ">{x.name}</a>
                            )
                        })}
                    </div>
                </div>

                {/** nav tooltip */}
                {/* <ReactTooltip
                    id="my-tooltip-1"
                    place="bottom"
                    content="Hello world! I'm a Tooltip"
                /> */}
            </div>
        </div>
    )
}