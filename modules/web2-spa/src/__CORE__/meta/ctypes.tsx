// LafTools
// 
// Date: Wed, 6 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import React from "react";
import { CommonTransformerPassProp } from "../../[lang]/client/src/types/workbench-types";
import { AppOptViewMode } from "../../[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer";



export type VersionReleaseRequirement = {
    consistentID: string | null, // e.g. if current consistent ID is not matched with one from new version, then we'd better do a full package release
    partials: { // in App, not every parts need to be downloaded and released, instead, we can reuse existing local directory to speed up the release process by checking their version
        id: string,
        destination: string[],
        partialConsistentID: string | null // if it's not matched, then need to do full package release.
    }[]
}


export type CommonTransformerProps = CommonTransformerPassProp & {
    crtOptMode: AppOptViewMode
};

export type ClientPortalInfo = {
    portalMode: boolean,
    appToolHeight: number
}
export let ClientPortalContext = React.createContext<ClientPortalInfo>({
    portalMode: false,
    appToolHeight: 0
})

