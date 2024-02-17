/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-02-17 16:05:56
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-17 22:56:51
 * @FilePath: \Fullstack2023\part6\query-anecdotes\src\components\Notification.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import { useNotification } from "../reducers/NotificationContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const { state } = useNotification();

  if (!state) return null;

  return <div style={style}>{state.message}</div>;
};

export default Notification;
