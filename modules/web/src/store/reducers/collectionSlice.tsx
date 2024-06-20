// LafTools
// 
// Date: Fri, 2 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from 'lodash'

type CollectionFolder = {
  id: number,
  name: string,
  createdAt: number,
}
type CollectionEntry = {
  id: number,
  name: string,
}
type CollectionState = {
  collectionFolder: CollectionFolder[],
  collectionEntry: CollectionEntry[]
};
const initialState: CollectionState = {
  collectionEntry: [],
  collectionFolder: [],
};


const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    updateOneOfParamState: (state, action: PayloadAction<Partial<CollectionState>>) => {
      _.merge(state, action.payload)
    },
  },
});

export default collectionSlice;
