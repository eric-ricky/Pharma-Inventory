import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: { isOpen: false, message: "", status: "" },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.notification = {
        isOpen: action.payload.isOpen,
        message: action.payload.message,
        status: action.payload.status,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
