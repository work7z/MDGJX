// LafTools
// 
// Date: Thu, 14 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc





import { getWebsiteName } from "@/__CORE__/common/config";
import { TopNav } from "@/__CORE__/containers/TopNav";
import CenterPart from "@/__CORE__/containers/CenterPart";
import CardPanel from '@/__CORE__/components/CardPanel'
import _, { random } from "lodash";

import InnerHome from '../../../../home'

import React, { useEffect } from "react";
import { LafPathIDParams, PageProps, } from '@/__CORE__/meta/pages'
import getAuthInfo, { AuthInfo } from "@/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";


import Tools, { CategorySearchProps, generateMetadata as toolMetaDataFn } from '@/[lang]/page'
import ToolPart from '../../src/parts/tools'
import AIPart from '../../src/parts/ai'
import UserPart from '../../src/parts/user'
import DocsPart from '../../src/parts/docs'
import ResourcesPart from '../../src/parts/resources'
import NavigatorPage from '../../src/parts/index'
import { ifnil } from "@/__CORE__/meta/fn";
import { getToolSubCategory } from "@/[lang]/client/src/impl/tools/d_subcategory";
export type AuthInfoProps = { authInfo: AuthInfo }
export type CombindSearchProps = PageProps<any, any>
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { hocClientWrapper } from "../../src/common/hocClientWrapper";
import RootLayout from "@/layout";
import RootLayoutWrapper from "@/layout";
import { Route, BrowserRouter as Router, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import exportUtils from "@/[lang]/client/src/utils/ExportUtils";

const SystemPage = (props) => {
    let h = useHistory()
    let [routeCtnForUpdated, setRouteCtnForUpdated] = React.useState<number>(Date.now())
    useEffect(() => {
        h.listen((l) => {
            setRouteCtnForUpdated(Date.now())
        });
    }, [h])
    let p: LafPathIDParams = useParams()
    let currentRoute: CategorySearchProps = {
        params: {
            subCategory: p.subCategory || "",
            category: (p.category || "tools") as any,
            id: p.id || ""
        },
        searchParams: {}
    }
    let { subCategory, category } = currentRoute.params
    if (_.isEmpty(subCategory)) {
        subCategory = getToolSubCategory()[0].id
        currentRoute = {
            ...currentRoute,
            params: {
                ...currentRoute.params,
                subCategory
            }
        }
    }
    let whatPartForChildren = <span>it is undefined so far</span>
    if (ifnil(category, '') == '' || category == 'tools') {
        whatPartForChildren = (
            <ToolPart  {...currentRoute} />
        )
    } else if (category == 'docs') {
        whatPartForChildren = (
            <DocsPart {...currentRoute} />
        )
    } else if (category == 'resources') {
        whatPartForChildren = (
            <ResourcesPart {...currentRoute} />
        )
    } else if (category == 'ai') {
        whatPartForChildren = (
            <AIPart {...currentRoute} />
        )
    } else if (category == 'user') {
        whatPartForChildren = <UserPart {...currentRoute} />
    } else {
        whatPartForChildren = (
            <div>sorry, I have no idea for this category {category}</div>
        )
    }
    return <NavigatorPage {...currentRoute} innerContent={whatPartForChildren}></NavigatorPage>
}

export default hocClientWrapper(function (props: CategorySearchProps) {
    return (
        <RootLayoutWrapper>
            <Router basename="/">
                <Switch>
                    <Route
                        path={"/"}
                        exact
                        component={SystemPage}
                    ></Route>
                    <Route
                        path={"/:locale"}
                        exact
                        component={SystemPage}
                    ></Route>
                    <Route
                        path={"/:locale/:category"}
                        exact
                        component={SystemPage}
                    ></Route>
                    <Route
                        path={"/:locale/:category/go/:subCategory"}
                        exact
                        component={SystemPage}
                    ></Route>
                    <Route
                        path={"/:locale/:category/go/:subCategory/:id"}
                        exact
                        component={SystemPage}
                    ></Route>
                    { /* 404 */}
                    <Route
                        component={() => {
                            let p = useParams()
                            let lo = useLocation()
                            return <div>404 Not Found - {lo.pathname} - {JSON.stringify(p)} - {lo.search}</div>
                        }}
                    ></Route>
                </Switch>
            </Router>
        </RootLayoutWrapper>
    )
})


export { generateMetadata } from '@/[lang]/page'