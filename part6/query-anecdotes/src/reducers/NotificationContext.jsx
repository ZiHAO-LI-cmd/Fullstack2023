/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-02-17 22:55:27
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-17 22:55:37
 * @FilePath: \Fullstack2023\part6\query-anecdotes\src\reducers\NotificationContext.js
 * @Description: 
 * 
 * Copyright (c) 2024 by zihao, All Rights Reserved. 
 */
// NotificationContext.js
import React, { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return { message: action.payload.message, type: action.payload.type };
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
