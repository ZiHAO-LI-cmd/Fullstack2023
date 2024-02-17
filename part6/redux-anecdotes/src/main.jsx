/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-19 12:34:23
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-17 14:18:42
 * @FilePath: \Fullstack2023\part6\redux-anecdotes\src\main.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import ReactDOM from "react-dom/client";
// import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
// import anecdoteReducer from "./reducers/anecdoteReducer";
// import filterReducer from "./reducers/filterReducer";
// import notificationReducer from "./reducers/notificationReducer";
// import { configureStore } from "@reduxjs/toolkit";
import store from "./store";

// const reducer = combineReducers({
//   filter: filterReducer,
//   anecdotes: anecdoteReducer,
// });

// const store = createStore(reducer);

// const store = configureStore({
//   reducer: {
//     filter: filterReducer,
//     anecdotes: anecdoteReducer,
//     notification: notificationReducer,
//   },
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
