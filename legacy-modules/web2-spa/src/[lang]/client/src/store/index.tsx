
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import configureStore from "../configureStore";
import _ from "lodash";
const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;
export { store };
