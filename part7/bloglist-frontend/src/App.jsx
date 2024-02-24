/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-08 01:52:34
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-24 02:09:14
 * @FilePath: \Fullstack2023\part7\bloglist-frontend\src\App.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */

import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortBlogsByLikes(blogs)));
  }, [user]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000); // 通知显示5秒后消失
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      showNotification('Wrong credentials', 'error');
    }
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.addOne(blogObject);
      setBlogs(sortBlogsByLikes(blogs.concat(returnedBlog)));
      showNotification(
        `A new blog '${returnedBlog.title}' by ${returnedBlog.author} added`,
        'success'
      );
    } catch (error) {
      showNotification('Error adding blog', 'error');
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        ></LoginForm>
      </Togglable>
    );
  };

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    setBlogs([]);
    blogService.setToken(null);
  };

  const updateBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(sortBlogsByLikes(updatedBlogs));
  };

  // Function to sort blogs by likes
  const sortBlogsByLikes = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes);
  };

  const handleDelete = async (blogToDelete) => {
    try {
      await blogService.deleteBlog(blogToDelete.id);
      const updatedBlogs = blogs.filter(blog => blog.id !== blogToDelete.id)
      setBlogs(sortBlogsByLikes(updatedBlogs));
    } catch (error) {
      console.error('Error deleting blog', error);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      {user === null && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout} className="btn btn-danger">logout</button>
          <Togglable buttonLabel="createBlog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      {blogs.map((blog) => (
        <div key={blog.id} className="col-md-4 mb-3">
          <Blog  blog={blog} updateBlog={updateBlog} handleDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default App;
