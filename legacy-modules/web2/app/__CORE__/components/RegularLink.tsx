// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

export default (props: {
    href: string,
    children: any
}) => {
    return <a href={props.href}>{props.children}</a>
}