/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-10-10 11:10:53
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-11-01 00:31:39
 * @FilePath: \Fullstack2023\part2\phonebook\src\services\Phonebook.jsx
 * @Description: 
 * 
 * Copyright (c) 2023 by zihao, All Rights Reserved. 
 */
import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const add = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  add: add,
  update: update,
  remove: remove,
};
