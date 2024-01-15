/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-14 23:34:06
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-14 23:34:23
 * @FilePath: \Fullstack2023\part4\Blog\controllers\testing.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
const testingRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
