/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-08 19:11:06
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-08 19:24:56
 * @FilePath: \Fullstack2023\part5\bloglist-frontend\src\components\BlogForm.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    // 清空表单
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            name="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            name="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
