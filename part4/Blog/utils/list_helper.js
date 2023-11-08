/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-09 00:08:51
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-11-09 01:26:44
 * @FilePath: \Fullstack2023\part4\Blog\utils\list_helper.js
 * @Description:
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const _ = require('lodash'); // 首先需要引入 Lodash

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  res = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max;
  }, blogs[0]);
  delete res._id;
  delete res.__v;
  delete res.url;
  return res;
};

const mostBlogs = (blogs) => {
  /*   const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  const mostBlogs = Object.keys(authorCounts).reduce((max, author) => {
    return authorCounts[author] > authorCounts[max] ? author : max;
  });

  const result = {
    author: mostBlogs,
    blogs: authorCounts[mostBlogs],
  }; */

  // 使用 `countBy` 对作者的博客进行计数
  const authorCounts = _.countBy(blogs, 'author');

  // 找到拥有最多博客数量的作者名和博客数
  const mostBlogsAuthor = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author],
  );

  const result = {
    author: mostBlogsAuthor,
    blogs: authorCounts[mostBlogsAuthor],
  };

  return result;
};

const mostLikes = (blogs) => {
  // 首先，我们将博客数组转换成作者和他们各自博客的点赞数的集合
  const authorLikes = _.map(blogs, (blog) => {
    return {author: blog.author, likes: blog.likes};
  });

  // 接下来，我们使用 reduce 函数合并集合中每个作者的点赞数
  const totalLikesByAuthor = _.reduce(
    authorLikes,
    (result, value) => {
      if (result[value.author]) {
        result[value.author] += value.likes;
      } else {
        result[value.author] = value.likes;
      }
      return result;
    },
    {},
  );

  // 然后，我们找到点赞数最多的作者和他们的点赞总数
  const maxLikes = _.maxBy(
    _.keys(totalLikesByAuthor),
    (author) => totalLikesByAuthor[author],
  );

  // 最后，我们返回一个对象，包含作者和点赞总数
  const result = {
    author: maxLikes,
    likes: totalLikesByAuthor[maxLikes],
  };

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
