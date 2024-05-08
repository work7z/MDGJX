// LafTools
// 
// Date: Thu, 8 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import Head from 'next/head'
import { Props } from "next/script";
import { getWebDesc, getWebsiteName } from "./__CORE__/common/config";
import { TopNav } from "./__CORE__/containers/TopNav";
import CenterPart from "./__CORE__/containers/CenterPart";
import CardPanel from './__CORE__/components/CardPanel'
import NodeHorizontalBar from "./__CORE__/containers/TabGroupHorizontalBar";
import Footer from "./__CORE__/containers/Footer";
import Layout from './__CORE__/containers/Layout'
import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs'
import PrelintInit from './__CORE__/script/preline-init'
import { getWebsiteLocale } from "./__CORE__/utils/TranslationUtils";
import ProgressBar from "./progressBar";
import { getAppDevIcon } from "./__CORE__/config/imgconfig";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "./nextui-provider";
import Link from "next/link";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import SetupPopPanel from "./__CORE__/containers/SetupPopPanel";
import VersionCheck from "./__CORE__/containers/VersionCheck";
import { RegisterSlot } from "./[lang]/[category]/src/fnrefmap";
import { Suspense } from "react";


// import dbconn from '.@/app/__CORE__/app/db/index'

export default async function RootLayout(props: {
  children,
}) {
  let { children } = props;
  return (
    <Suspense>
      <Layout>
        {children}
        <PrelintInit></PrelintInit>
        <ProgressBar></ProgressBar>
        {/* client */}
        <SetupPopPanel />
        <VersionCheck />
        <RegisterSlot />
      </Layout>
    </Suspense>
  );
}

export async function generateMetadata(
  { }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: getWebsiteName(),
    description: getWebDesc(),
    icons: [
      getAppDevIcon()
    ]
  };
}