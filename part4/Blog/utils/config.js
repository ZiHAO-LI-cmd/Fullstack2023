/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-08 22:37:41
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-12-31 22:44:43
 * @FilePath: \Fullstack2023\part4\Blog\utils\config.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
require('dotenv').config();

const PORT = process.env.PORT;

const MONGODB_URI = process.env.NODE_ENV === 'test' ?
  process.env.TEST_MONGODB_URI :
  process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
