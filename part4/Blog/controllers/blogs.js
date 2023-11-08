/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-08 22:42:02
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-11-09 00:04:42
 * @FilePath: \Fullstack2023\part4\Blog\controllers\blogs.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
// eslint-disable-next-line new-cap
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
