/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-03 17:19:00
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-03 22:38:23
 * @FilePath: \Fullstack2023\part4\Blog\models\user.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: [true, 'Username required'],
    unique: true,
  },
  name: String,
  passwordHash: {
    type: String,
    minLength: 3,
    required: [true, 'Password required'],
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
