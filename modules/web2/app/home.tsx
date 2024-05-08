import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import Head from 'next/head'
import { Props } from "next/script";
import { Dot } from "./__CORE__/utils/TranslationUtils";
import { getWebsiteName } from "./__CORE__/common/config";
import { TopNav } from "./__CORE__/containers/TopNav";
import CenterPart from "./__CORE__/containers/CenterPart";
import CardPanel from './__CORE__/components/CardPanel'
import NodeHorizontalBar from "./__CORE__/containers/TabGroupHorizontalBar";
import _, { random } from "lodash";
import { useParams, useSearchParams } from "next/navigation";
import { usePathname } from 'next/navigation';
import React, { } from "react";
import GrailLayoutWithUser from "./__CORE__/containers/GrailLayoutWithUser";
import { AuthInfoProps } from "./[lang]/[category]/page";


export default (props: {
    combindSearchProps: any
}) => {
    return ''
}

