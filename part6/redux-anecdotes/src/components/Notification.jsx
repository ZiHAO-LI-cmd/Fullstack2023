/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-02-06 02:32:14
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-06 02:37:51
 * @FilePath: \Fullstack2023\part6\redux-anecdotes\src\components\Notification.jsx
 * @Description: 
 * 
 * Copyright (c) 2024 by zihao, All Rights Reserved. 
 */
import { useSelector } from "react-redux";

const Notification = () => {
  // Access the notification state from the store
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
