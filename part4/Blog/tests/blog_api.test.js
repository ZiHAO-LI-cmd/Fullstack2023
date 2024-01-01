/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-12-31 22:48:36
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-01 17:19:56
 * @FilePath: \Fullstack2023\part4\Blog\tests\blog_api.test.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

// test('there are two blogs', async () => {
//   const response = await api.get('/api/blogs');

//   expect(response.body).toHaveLength(2);
// });

test('the identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0]._id).toBeDefined();
});

test('a valid blog can be added ', async () => {
  const blogsAtBegin = await api.get('/api/blogs');
  const newBlog = {
    title: 'How to learn cs',
    author: 'XXX',
    url: 'XXX.cool',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsAtBegin.body.length + 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
