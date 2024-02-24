/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-08 01:52:34
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-14 03:46:47
 * @FilePath: \Fullstack2023\part5\bloglist-frontend\src\services\blogs.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
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

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, setToken, addOne, update, deleteBlog };
