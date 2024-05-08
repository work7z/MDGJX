// LafTools
// 
// Date: Thu, 8 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import "./globals.css";
import { getWebDesc, getWebsiteName } from "./__CORE__/common/config";
import { TopNav } from "./__CORE__/containers/TopNav";
import CenterPart from "./__CORE__/containers/CenterPart";
import CardPanel from './__CORE__/components/CardPanel'
import NodeHorizontalBar from "./__CORE__/containers/TabGroupHorizontalBar";
import Footer from "./__CORE__/containers/Footer";
import Layout from './__CORE__/containers/Layout'
import fs from 'fs'
import PrelintInit from './__CORE__/script/preline-init'
import ProgressBar from "./progressBar";
import { getAppDevIcon } from "./__CORE__/config/imgconfig";
import { Providers } from "./nextui-provider";
import Link from "@/__CORE__/components/Link";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import SetupPopPanel from "./__CORE__/containers/SetupPopPanel";
import VersionCheck from "./__CORE__/containers/VersionCheck";
import { RegisterSlot } from "./[lang]/[category]/src/fnrefmap";
import { Suspense } from "react";


// import dbconn from '.@/__CORE__/app/db/index'

export default function RootLayoutWrapper(props: {
  children,
}) {
  let { children } = props;
  return (
    <Layout>
      {children}
      <PrelintInit></PrelintInit>
      <ProgressBar></ProgressBar>
      <SetupPopPanel />
      <VersionCheck />
      <RegisterSlot />
    </Layout>
  );
}

export type Metadata = {
  title: string;
  description: string;
  keywords?: string[];
  icons: string[];
}

export async function generateMetadata(
  { }: any,
  parent: any
): Promise<Metadata> {
  return {
    title: getWebsiteName(),
    description: getWebDesc(),
    icons: [
      getAppDevIcon()
    ]
  };
}