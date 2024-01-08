/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-08 01:52:34
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-08 19:40:09
 * @FilePath: \Fullstack2023\part5\bloglist-frontend\src\services\blogs.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  // console.log(config);
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const addOne = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newBlog, config);
  return request.then((response) => response.data);
};

export default { getAll, setToken, addOne };
