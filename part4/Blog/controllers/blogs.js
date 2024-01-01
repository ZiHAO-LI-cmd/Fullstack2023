/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-08 22:42:02
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-01 17:25:26
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

// blogsRouter.post('', (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
