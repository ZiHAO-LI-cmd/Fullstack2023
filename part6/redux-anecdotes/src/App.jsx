/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-19 12:34:23
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-17 14:20:33
 * @FilePath: \Fullstack2023\part6\redux-anecdotes\src\App.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import anecdoteService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification></Notification>
      <Filter></Filter>
      <AnecdoteList></AnecdoteList>
      <h2>create new</h2>
      <AnecdoteForm></AnecdoteForm>
    </div>
  );
};

export default App;
