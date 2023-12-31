/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-08 22:42:10
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-03 23:48:59
 * @FilePath: \Fullstack2023\part4\Blog\models\blog.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
