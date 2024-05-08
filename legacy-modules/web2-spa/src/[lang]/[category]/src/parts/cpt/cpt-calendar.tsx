// LafTools
// 
// Date: Sat, 16 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

'use client'

import { useEffect, useState } from 'react';

import { DatePicker3, TimePrecision } from "@blueprintjs/datetime2";
import { Classes } from '@blueprintjs/core';

// <Calendar onChange={onChange} value={value} locale={"zh-CN"} />
// type Value = ValuePiece | [ValuePiece, ValuePiece];
export default () => {
    // const [value, onChange] = useState<Value>(new Date());

    return <>
        <DatePicker3
            className={Classes.ELEVATION_1}
            dayPickerProps={{ showOutsideDays: false, showWeekNumber: false }}
            footerElement={undefined}
            onChange={() => {

            }}
            timePickerProps={{
                precision: TimePrecision.MINUTE,
                useAmPm: true,
                showArrowButtons: true,
            }}
        />
    </>
}