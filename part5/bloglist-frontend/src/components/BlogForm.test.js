/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-14 18:54:01
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-14 19:00:15
 * @FilePath: \Fullstack2023\part5\bloglist-frontend\src\components\BlogForm.test.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('form calls the createBlog event handler with right details when a new blog is created', () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const titleInput = component.container.querySelector('input[name="title"]');
  const authorInput = component.container.querySelector('input[name="author"]');
  const urlInput = component.container.querySelector('input[name="url"]');
  const form = component.container.querySelector('form');

  userEvent.type(titleInput, 'Testing Blog Title');
  userEvent.type(authorInput, 'Test Author');
  userEvent.type(urlInput, 'http://testurl.com');
  fireEvent.submit(form);

  expect(createBlog).toHaveBeenCalledTimes(1);
});