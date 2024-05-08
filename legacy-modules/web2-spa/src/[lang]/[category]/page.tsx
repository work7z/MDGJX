// LafTools
// 
// Date: Thu, 14 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc




import _, { random } from "lodash";

import React, { } from "react";



import { CategorySearchProps, generateMetadata as toolMetaDataFn } from "../page";
import EntryPage from './go/[subCategory]/page'
export type AuthInfoProps = {}

export let sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default function Home(props: CategorySearchProps) {
    return (
        <EntryPage {...props} />
    )
}


