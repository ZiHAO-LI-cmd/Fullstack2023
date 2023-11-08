/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-08 22:37:49
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-11-08 22:38:54
 * @FilePath: \Fullstack2023\part4\Blog\utils\logger.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};
