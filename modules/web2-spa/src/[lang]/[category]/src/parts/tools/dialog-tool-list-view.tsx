'use client'

import React from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, light_border_clz_all, tw } from '@/__CORE__/meta/styles';
import { Dot } from '@/__CORE__/utils/cTranslationUtils';
import SubTabNav from '../nav/nav-sub-tab';
import Link from '@/__CORE__/components/Link';
import { fmtURL_Server } from '@/__CORE__/utils/routeUtils';
import ToolView from './view-tools'
import { useConstructedKeyAndInit } from '@/[lang]/client/src/initapp';
import FundrasingPlanBtn from '../cpt/cpt-fundrasing-btn';
import Sidebar from './main-sidebar';
import { ToolProp } from '.';
import ExtraListTool from './extra-list-tool';
import { CategoryTypeSearchDetail } from '@/[lang]/page';
import { Button, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
import exportUtils from '@/[lang]/client/src/utils/ExportUtils';
import { loadDOT } from '@/__CORE__/utils/i18n-for-dynamic-loadDOT';
import { CrtToolProp } from './pkg-tool-main';

let d = loadDOT("IVmxAXWyR")

export default (props: CrtToolProp) => {
    d()
    // FIXME: if user wants to view a tool, curretnly we can just update its tool settle first, not to show a dialog as it's pretty wrired
    let { isOpen } = exportUtils.useSelector(v => ({
        isOpen: v.memoryState.siteToolDialogOpen == 't'
    }))
    // return <Dialog isOpen={isOpen} title={Dot("iAxHFt_gr", "Quick View")} icon="info-sign">
    //     <DialogBody>
    //         <p>
    //             <ToolView
    //                 {...props}
    //                 searchToolItem={{
    //                     id: props.searchToolItem.id,
    //                     label: 'new item',
    //                     toolId: 'edc_base32'
    //                 }}
    //             />
    //         </p>
    //     </DialogBody>
    //     <DialogFooter actions={<Button intent="primary" text="Close" onClick={() => {
    //         //
    //     }} />} />
    // </Dialog>
    return ''
}


{/* */ }