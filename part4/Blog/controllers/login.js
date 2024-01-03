/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-03 23:51:43
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-03 23:52:24
 * @FilePath: \Fullstack2023\part4\Blog\controllers\login.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body;

  const user = await User.findOne({username});
  const passwordCorrect = user === null ?
    false :
    await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({token, username: user.username, name: user.name});
});

module.exports = loginRouter;
