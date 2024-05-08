
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createListenerMiddleware } from "@reduxjs/toolkit";

// Best to define this in a separate file, to avoid importing
// from the store file into the rest of the codebase
export const listenerMiddleware = createListenerMiddleware();

export const { startListening, stopListening } = listenerMiddleware;
