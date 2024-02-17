/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-19 13:51:44
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-17 14:50:38
 * @FilePath: \Fullstack2023\part6\redux-anecdotes\src\components\AnecdoteList.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {showNotificationWithTimeout} from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    [...state.anecdotes]
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  );

  const dispatch = useDispatch();

  const voteForAnecdote = (id) => {
    console.log("vote", id);
    // dispatch({
    //   type: "VOTE",
    //   id,
    // });
    dispatch(vote(id));
    const anecdote = anecdotes.find(anecdote => anecdote.id === id);
    dispatch(showNotificationWithTimeout(`You voted for '${anecdote.content}'`, 5000));
  };

  // console.log(anecdotes);

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteForAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
