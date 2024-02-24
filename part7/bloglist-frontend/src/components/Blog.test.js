import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
  };

  const component = render(<Blog blog={blog} />);
  const title = component.container.querySelector('.blog-title');
  const author = component.container.querySelector('.blog-author');

  expect(title).toHaveTextContent(blog.title);
  expect(author).toHaveTextContent(blog.author);
});

test('shows the blog\'s URL and number of likes when the view button is clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
  };

  const component = render(<Blog blog={blog} />);

  // Find the button that toggles the visibility of the details
  const button = component.getByText('view');

  // Simulate a click event on the button using userEvent
  userEvent.click(button);

  // Check if the URL and number of likes are now visible
  const url = component.getByText(blog.url);
  const likes = component.getByText(`${blog.likes}`);

  expect(url).toBeInTheDocument();
  expect(likes).toBeInTheDocument();
});

test('updateBlog is called twice when like button is clicked twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    id: 'test-blog-id'
  };

  // 创建 mockUpdateBlog 函数
  const mockUpdateBlog = jest.fn();

  const component = render(
    <Blog blog={blog} updateBlog={mockUpdateBlog} handleDelete={() => {}} />
  );

  // 点击 'view' 按钮以显示 'like' 按钮
  const viewButton = component.getByText('view');
  userEvent.click(viewButton);

  // 找到并点击两次 'like' 按钮
  const likeButton = component.getByText('like');
  userEvent.click(likeButton);
  userEvent.click(likeButton);

  // 断言 mockUpdateBlog 被调用了两次
  expect(mockUpdateBlog).toHaveBeenCalledTimes(2);
});