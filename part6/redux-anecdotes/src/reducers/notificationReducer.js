import { createSlice } from "@reduxjs/toolkit";

const initialState = "Welcome to the Redux app!";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      // Clear the notification by returning an empty string or null
      return "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotificationWithTimeout = (message, time) => (dispatch) => {
  dispatch(setNotification(message));

  setTimeout(() => {
    dispatch(clearNotification());
  }, time);
};

export default notificationSlice.reducer;
