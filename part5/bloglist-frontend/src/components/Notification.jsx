/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-08 19:43:48
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-08 19:54:08
 * @FilePath: \Fullstack2023\part5\bloglist-frontend\src\components\Notification.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import React from "react";

const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationStyle = {
    color: type === "success" ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
