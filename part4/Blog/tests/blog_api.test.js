/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-12-31 22:48:36
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-12-31 22:48:55
 * @FilePath: \Fullstack2023\part4\Blog\tests\note_api.test.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(2);
});

afterAll(async () => {
  await mongoose.connection.close();
});
