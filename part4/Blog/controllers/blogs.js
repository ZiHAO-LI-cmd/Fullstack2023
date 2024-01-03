/* eslint-disable max-len */
/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-08 22:42:02
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-04 01:25:06
 * @FilePath: \Fullstack2023\part4\Blog\controllers\blogs.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
// eslint-disable-next-line new-cap
const blogsRouter = require('express').Router();
const {request, response} = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization');
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '');
//   }
//   return null;
// };

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1});

  response.json(blogs);
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
  // console.log(request.token);
  // const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // if (!decodedToken.id) {
  //   return response.status(401).json({error: 'token invalid'});
  // }
  // const user = await User.findById(decodedToken.id);

  const user = request.user;

  const blog = new Blog({
    ...request.body,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end(); // Blog not found
    }

    // const decodedToken = jwt.verify(request.token, process.env.SECRET);
    // if (!decodedToken.id) {
    //   return response.status(401).json({error: 'token missing or invalid'});
    // }

    // if (blog.user.toString() !== decodedToken.id.toString()) {
    //   return response.status(401).json({error: 'only the creator can delete a blog'});
    // }

    if (!request.user) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    if (blog.user.toString() !== request.user._id.toString()) {
      return response.status(401).json({error: 'only the creator can delete a blog'});
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
