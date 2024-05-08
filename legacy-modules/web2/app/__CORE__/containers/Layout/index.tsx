// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import { Inter } from "next/font/google";
import TranslationUtils, { getWebsiteLocale as getWebsiteLocale } from "../../utils/TranslationUtils";
import { TopNav } from "../TopNav";
import CenterPart from "../CenterPart";
import Footer from "../Footer";
import { ThemeProvider } from "../../../theme-provider";
import Script from 'next/script'
import { KEY_LAFTOOLS_THEME } from "../../meta/constants";
import { Suspense } from "react";


const inter = Inter({ subsets: ["latin"] });
export default function RootLayout(props: {
    children,
}) {
    let { children } = props;
    // suppressHydrationWarning
    return (
        <html lang={getWebsiteLocale()} suppressHydrationWarning={false} className="" style={{
            display: 'none'
            // background: 'gray',
            // width: '100',
            // height: '100vh'
        }} >
            <head>
                <meta name="baidu-site-verification" content="codeva-fgug77ENT9" />
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-C3NXGY8E7J"
                />
                <Script id="google-analytics" >
                    {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-C3NXGY8E7J');
          `}
                </Script>
                <Script strategy="beforeInteractive" dangerouslySetInnerHTML={{
                    __html: `
                        var theme = localStorage.getItem("${KEY_LAFTOOLS_THEME}")
                        var htmlEle=document.getElementsByTagName("html")[0]
                        if (theme == 'dark') {
            htmlEle.className='bp5-dark dark'
        }
        htmlEle.style.display='block'
        
        `

                }}>

                </Script>
            </head>
            <body className={' laf-app min-h-screen dark:bg-slate-950 dark:text-slate-300    ' + inter.className}>
                {/* <div className="fixed top-0 left-0 w-full h-full bg-gray-500 z-[100]" id='blink'></div> */}
                <div className="w-full h-full">
                    {children}
                </div>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
                </ThemeProvider>
            </body>
        </html>
    );
}
