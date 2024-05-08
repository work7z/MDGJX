// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { getPureWebsiteName } from "@/app/__CORE__/common/config"
import { Dot } from "@/app/__CORE__/utils/TranslationUtils"
import { useRouter } from "next/navigation";
import React from 'react'


export type NodeType = {
   id: string;
   label: string;
}


export type TabGroupType = {
   id: string;
   label: string;
   children?: NodeType[]
}

export let getGroupAndNodeData = (): TabGroupType[] => {
   let list: TabGroupType[] = [
      {
         label: Dot("ZCzH8", "Newest"),
         id: "latest"
      },
      {
         label: Dot("GaySMPQHo", "Trending"),
         id: "trending",
      },
      {
         label: "PETS",
         id: "pets",
      },
      {
         label: Dot("englishcorner", "English"),
         id: "english"
      },
      {
         label: Dot("nncQE", "Life"),
         id: "life",
      },
      {
         label: Dot("b7wgrhuXl", "Tech"),
         id: 'tech'
      },
      {
         label: Dot("43be5", "Diary"),
         id: 'diary'
      },
      {
         label: Dot("WKG7e", "Rules"),
         id: 'rules'
      },
      {
         label: Dot("pNwe3", "Other"),
         id: 'other'
      }
   ]
   return list
}

export default (props: { activeId?: string }) => {
   let list = getGroupAndNodeData()
   let activeId = props.activeId
   if (!activeId) activeId = list[0].id
   // get id path varialble from url in next.js
   return <div className="px-2 py-2 space-x-2 flex">{
      list.map(x => {
         return <a className={(activeId == x.id ? ' !bg-zinc-800 hover:!bg-zinc-700 dark:!bg-solarized-base02  text-white dark:text-slate-200  ' : '') + ` p-2   transition-all duration-200 rounded hover:dark:bg-solarized-base03 hover:bg-slate-100   `} href={'/?tabs=' + x.id} >{x.label}</a>
      })
   }</div>
}