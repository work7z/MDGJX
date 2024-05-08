// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import React from 'react'




type PassProps = { className?: string, children?: any, style?: any }

export default (props: PassProps) => {
    return <div className={'  rounded-sm shadow-sm   bg-white dark:bg-solarized-base03Dark   w-full ' + props.className} style={props.style}>{props.children}</div>
}