/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-19 13:42:59
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-17 15:46:49
 * @FilePath: \Fullstack2023\part6\redux-anecdotes\src\components\AnecdoteForm.jsx
 * @Description: 
 * 
 * Copyright (c) 2024 by zihao, All Rights Reserved. 
 */
import { useDispatch } from "react-redux";
import { createAnecdote } from "../../src/reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    // const newNote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
