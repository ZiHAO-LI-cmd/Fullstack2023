/* eslint-disable max-len */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('POST /api/user', () => {
  test('creates a new user with a valid request', async () => {
    const usersAtStart = await api.get('/api/user');

    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword',
    };

    await api
      .post('/api/user')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.body.length + 1);
  });

  test('does not create user with a username shorter than 3 characters', async () => {
    const newUser = {
      username: 'tu',
      name: 'Test User',
      password: 'testpassword',
    };

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toBeDefined();
    expect(result.body.error).toContain('Username must be at least 3 characters long');
  });

  // Add more tests for other invalid scenarios...
});


afterAll(async () => {
  await mongoose.connection.close();
});
