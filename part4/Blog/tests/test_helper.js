/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-01 17:03:10
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-01 17:06:07
 * @FilePath: \Fullstack2023\part4\Blog\tests\test_helper.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
const Blog = require('../models/blog');

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'How to learn cs',
    author: 'XXX',
    url: 'XXX.cool',
  });

  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  nonExistingId,
  blogsInDb,
};
