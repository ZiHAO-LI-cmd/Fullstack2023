/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-02-06 00:43:23
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-06 02:12:26
 * @FilePath: \Fullstack2023\part6\redux-anecdotes\src\reducers\filterReducer.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import { createSlice } from "@reduxjs/toolkit";

// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const filterChange = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };

// export default filterReducer;

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
