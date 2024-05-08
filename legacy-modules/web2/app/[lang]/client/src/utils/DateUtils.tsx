
// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { logutils } from "./LogUtils";

import _ from "lodash";
import { Dot } from "./cTranslationUtils";
import moment from "moment";
import { AxiosError } from "axios";

const DateUtils = {
  parseDate(dateString: string, format: string): Date {
    return moment(dateString, format).toDate();
  },

  isSameDay(date1: Date, date2: Date): boolean {
    return moment(date1).isSame(date2, "day");
  },

  isBefore(date1: Date, date2: Date): boolean {
    return moment(date1).isBefore(date2);
  },

  isAfter(date1: Date, date2: Date): boolean {
    return moment(date1).isAfter(date2);
  },
  formatDateTime(time: any): string {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  },
};
export default DateUtils;
