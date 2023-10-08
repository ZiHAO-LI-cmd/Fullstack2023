/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-09-13 22:40:27
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-09-14 00:03:30
 * @FilePath: \Fullstack2023\part1\course-information\src\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by zihao, All Rights Reserved. 
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
