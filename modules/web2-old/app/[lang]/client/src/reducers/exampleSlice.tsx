import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const initialState = {
  libai: 1234,
};

type ExampleState = typeof initialState;

const ExampleSlice = createSlice({
  name: "Example",
  initialState,
  reducers: {
    updateExample(state: ExampleState, action: PayloadAction) {
      //
    },
  },
});

export default ExampleSlice;
