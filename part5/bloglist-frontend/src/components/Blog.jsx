import React from 'react';
import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      updateBlog(returnedBlog);
    } catch (exception) {
      console.error('Error updating blog likes', exception);
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        view
      </button>
      <button style={showWhenVisible} onClick={toggleVisibility}>
        hide
      </button>
      <div style={showWhenVisible}>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          <button onClick={handleDeleteClick}>delete</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
