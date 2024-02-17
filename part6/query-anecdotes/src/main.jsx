/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-02-17 16:05:56
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-17 23:28:47
 * @FilePath: \Fullstack2023\part6\query-anecdotes\src\main.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "./reducers/NotificationContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </QueryClientProvider>
);
