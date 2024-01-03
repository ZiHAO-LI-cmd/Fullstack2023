/* eslint-disable max-len */
/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-03 17:23:30
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-03 23:17:30
 * @FilePath: \Fullstack2023\part4\Blog\controllers\user.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
const bcrypt = require('bcrypt');
// eslint-disable-next-line new-cap
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('', (request, response) => {
  User.find({}).then((users) => {
    response.json(users);
  });
});

usersRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body;

  // Validation for username and password
  if (!username || username.length < 3) {
    return response.status(400).json({error: 'Username must be at least 3 characters long'});
  }

  if (!password || password.length < 3) {
    return response.status(400).json({error: 'Password must be at least 3 characters long'});
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
