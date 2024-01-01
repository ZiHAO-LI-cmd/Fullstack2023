/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-08 22:42:02
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-01 22:49:46
 * @FilePath: \Fullstack2023\part4\Blog\controllers\blogs.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
// eslint-disable-next-line new-cap
const blogsRouter = require('express').Router();
const {request, response} = require('../app');
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
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({error: 'title or url missing'});
  }

  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end(); // Blog not found
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end(); // Successfully deleted, no content to send back
  } catch (exception) {
    next(exception);
    // Handle errors and pass them to the error handling middleware
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const {title, author, url, likes} = request.body;

  const updatedBlog = {
    title,
    author,
    url,
    likes,
  };

  try {
    const blog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      {new: true, runValidators: true, context: 'query'},
    );
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end(); // Not found
    }
  } catch (exception) {
    next(exception);
  }
});


module.exports = blogsRouter;
