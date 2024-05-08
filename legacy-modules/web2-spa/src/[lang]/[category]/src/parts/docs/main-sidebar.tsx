// LafTools
// 
// Date: Sat, 16 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import React from 'react';
// import { Card, Button, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, light_border_clz_all, tw } from '@/__CORE__/meta/styles';
import { Dot, getHStr } from '@/__CORE__/utils/TranslationUtils';
import Link from '@/__CORE__/components/Link';
import { fmtURL_Server } from '@/__CORE__/utils/routeUtils';
import FundrasingPlanBtn from '../cpt/cpt-fundrasing-btn';
import { ToolProp, getCardsProps } from '.';



export default (props: ToolProp) => {
    return ''
    // let secondaryPanelClzHeader = tw('bg-slate-50 g-card-header dark:bg-slate-700')

    // return <div className='w-64  space-y-2'>
    //     <Card {...getCardsProps()}>
    //         <CardHeader className={secondaryPanelClzHeader}>{Dot("ob1q-I7s-", "About LafTools")}</CardHeader>
    //         <CardBody>
    //             <div className='space-y-2'>
    //                 <Link className='flex flex-row items-center justify-center ' href={fmtURL_Server(['client'])}>
    //                     <Button color='primary' fullWidth size='sm' variant='bordered'>
    //                         <img src='/static/controls/program.png' className='w-5 h-5 mr-[2px] ' />
    //                         <span className=''>
    //                             {Dot("kUSuP_S-Y", "Try with Client UI")}
    //                         </span>
    //                     </Button>
    //                 </Link>
    //                 <FundrasingPlanBtn />
    //             </div>
    //         </CardBody>
    //     </Card>
    // </div>
}