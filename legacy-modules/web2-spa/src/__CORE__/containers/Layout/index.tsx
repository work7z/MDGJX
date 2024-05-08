// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import TranslationUtils, { getWebsiteLocale as getWebsiteLocale } from "../../utils/TranslationUtils";
import { ThemeProvider } from "../../../theme-provider";
import { KEY_LAFTOOLS_THEME } from "../../meta/constants";
import { Suspense } from "react";
import ClientWrapper from "@/[lang]/[category]/src/common/clientWrapper";
import { useConstructedKeyAndInit } from "@/[lang]/client/src/initapp";

export let Script = (props) => {
    return <span>register me please</span>
}

export default function RootLayout(props: {
    children,
}) {
    let { children } = props;
    let constructedKey = useConstructedKeyAndInit();
    return (
        <div key={constructedKey} className={' laf-app min-h-screen dark:bg-slate-950 dark:text-slate-300    '}>
            <div className="w-full h-full">
                <ClientWrapper>
                    {children}
                </ClientWrapper>
            </div>
        </div>
    );
}
