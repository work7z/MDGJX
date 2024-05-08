// LafTools
// 
// Date: Sat, 6 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { useEffect } from "react"
import onlineAPISlice, { UserPayload } from "../reducers/onlineAPISlice";

export type LoginStatus = {
    Loading: boolean;
    Info?: UserPayload
}

export let useCloudLoginStatus = (): LoginStatus => {
    let st = onlineAPISlice.useGetUserStatusQuery({}, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        pollingInterval: 1000 * 60 * 5, // 5 minutes a time
    })
    return {
        Loading: st.isLoading,
        Info: st.data?.payload.value,
    }
}