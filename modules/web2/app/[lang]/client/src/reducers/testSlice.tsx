
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TestState {
  todos: Todo[];
  msg: string;
  whetherListenMsg: string;
}

const initialState: TestState = {
  todos: [],
  msg: `hello, world, ${Date.now()}`,
  whetherListenMsg: "no",
};

const testSlice = createSlice({
  name: "test",
  initialState,

  reducers: {
    whetherEnableIt(state, action: PayloadAction<{ isOK: boolean }>) {
      state.whetherListenMsg = action.payload.isOK ? "yes" : "no";
    },
    updateMsg(state, action: PayloadAction<{ newMsg: string }>) {
      console.log(`newmsg: `, action.payload.newMsg);
      state.msg = action.payload.newMsg;
    },
    pong(state, action: PayloadAction<{ id: string; text?: string }>) {
      // state update here
    },
    // Give case reducers meaningful past-tense "event"-style names
    todoAdded(state, action) {
      const { id, text } = action.payload;
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.todos.push({
        id,
        text,
        completed: false,
      });
    },
    todoToggled(state, action) {
      // Look for the specific nested object to update.
      // In this case, `action.payload` is the default field in the action,
      // and can hold the `id` value - no need for `action.id` separately
      const matchingTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );

      if (matchingTodo) {
        // Can directly "mutate" the nested object
        matchingTodo.completed = !matchingTodo.completed;
      }
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { todoAdded, todoToggled, pong } = testSlice.actions;
export const testSliceActions = testSlice.actions;

// Export the slice reducer as the default export
export default testSlice;

startListening({
  // Match this exact action type based on the action creator
  actionCreator: testSlice.actions.updateMsg,
  // Run this effect callback whenever that action is dispatched
  effect: async (action, listenerApi) => {
    await listenerApi.delay(1000);
    listenerApi.dispatch(
      testSlice.actions.whetherEnableIt({
        isOK: true,
      })
    );
  },
});
