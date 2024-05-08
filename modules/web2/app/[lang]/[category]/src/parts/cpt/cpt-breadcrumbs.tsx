// LafTools
// 
// Date: Sat, 24 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Dot } from "@/app/__CORE__/utils/cTranslationUtils";
import { loadDOT } from "@/app/__CORE__/utils/i18n-for-load";
import { NavigatorPassProp } from "..";
import { fmtURL_Client } from "@/app/__CORE__/utils/cRouteUtils";
import { URL_SUBCATEGORY_GO_PATH, URL_TOOL_CATEGORY } from "@/app/__CORE__/meta/url";
import { fmtURL_ToolSubPageClient } from "@/app/__CORE__/meta/client";
import { CategoryTypeSearchDetail } from "@/app/[lang]/page";

let a = loadDOT("EiVD4")

export default function (props: { toolSearchDetail: CategoryTypeSearchDetail }) {
    a()
    return (
        <Breadcrumbs size={"sm"}>
            <BreadcrumbItem href={fmtURL_Client([])}>{Dot("Ln0dR", "Home")}</BreadcrumbItem>
            <BreadcrumbItem href={fmtURL_ToolSubPageClient([])}>{(
                props.toolSearchDetail.targetSubCategory.secondBreadcrumbLabel
                || Dot("zMNF4B1wK", "System Module")
            )}</BreadcrumbItem>
            <BreadcrumbItem href={fmtURL_ToolSubPageClient([URL_SUBCATEGORY_GO_PATH, props.toolSearchDetail.targetSubCategory.id])}>{props.toolSearchDetail.targetSubCategory.label}</BreadcrumbItem>
            <BreadcrumbItem href={
                fmtURL_ToolSubPageClient([URL_SUBCATEGORY_GO_PATH, props.toolSearchDetail.targetSubCategory.id, props.toolSearchDetail.searchToolItem.id])
            }>{props.toolSearchDetail.searchToolItem.label}</BreadcrumbItem>
        </Breadcrumbs>
    );
}
