import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    add: (state: any, action: any) => {
      state.notifications.push({
        message: action.payload.message,
        status: action.payload.status,
        open: true,
      });
    },
    close: (state: any, action: any) => {
      state.notifications = state.notifications.filter(
        (n: any) => n.message !== action.payload
      );
    },
  },
});

export const { add, close } = notificationsSlice.actions;
export default notificationsSlice.reducer;
