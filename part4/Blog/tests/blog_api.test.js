/* eslint-disable max-len */
/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-12-31 22:48:36
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-04 01:37:48
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

const loginUser = {
  username: 'XXX',
  password: '123456',
};

let token;

beforeAll(async () => {
  const response = await api
    .post('/api/login')
    .send(loginUser);

  token = response.body.token;
});

describe('when there is initially some notes saved', () => {
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

  test('the identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0]._id).toBeDefined();
  });


  test('if likes property is missing it defaults to 0', async () => {
    const newBlog = {
      title: 'Testing Default Likes',
      author: 'Test Author',
      url: 'http://testurl.com',
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });
});

describe('addition of a new note', () => {
  test('a valid blog can be added ', async () => {
    const blogsAtBegin = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`);
    const newBlog = {
      title: 'How to learn cs',
      author: 'XXX',
      url: 'XXX.cool',
    };

    console.log(token);

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtBegin.body.length + 1);
  });

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'No Title Author',
      url: 'http://notitle.com',
      likes: 4,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'No URL',
      author: 'No URL Author',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('adding a blog fails with proper status code 401 Unauthorized if a token is not provided', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'Unauthorized Author',
      url: 'http://unauthorized.com',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    // Create a new blog post
    const newBlog = {
      title: 'Temporary blog',
      author: 'Temp Author',
      url: 'http://tempurl.com',
      likes: 0,
    };

    const createdBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtStart = await helper.blogsInDb();

    console.log(createdBlog.body._id);

    // Delete the newly created blog post
    await api
      .delete(`/api/blogs/${createdBlog.body._id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    // Verify that the blog post count has decreased
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    // Verify that the deleted blog post is not in the database
    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(newBlog.title);
  });
});


describe('updating a blog post', () => {
  test('succeeds with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlogData = {
      title: 'Updated Title',
      author: 'Updated Author',
      url: 'http://updatedurl.com',
      likes: 100,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

    expect(updatedBlog.title).toBe(updatedBlogData.title);
    expect(updatedBlog.author).toBe(updatedBlogData.author);
    expect(updatedBlog.url).toBe(updatedBlogData.url);
    expect(updatedBlog.likes).toBe(updatedBlogData.likes);
  });

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();

    const updatedBlogData = {
      title: 'Non-Existent Blog',
      author: 'No Author',
      url: 'http://nonexistentblog.com',
      likes: 0,
    };

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .send(updatedBlogData)
      .expect(404);
  });

  // Additional test cases can be added here
});

afterAll(async () => {
  await mongoose.connection.close();
});
