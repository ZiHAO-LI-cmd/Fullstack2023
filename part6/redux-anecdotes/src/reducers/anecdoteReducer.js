/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-19 12:34:23
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-06 01:58:09
 * @FilePath: \Fullstack2023\part6\redux-anecdotes\src\reducers\anecdoteReducer.js
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

// const reducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);

//   switch (action.type) {
//     case "VOTE":
//       return state.map((anecdote) =>
//         anecdote.id !== action.id
//           ? anecdote
//           : { ...anecdote, votes: anecdote.votes + 1 }
//       );

//     case "NEW_ANECDOTE":
//       return [...state, action.payload];

//     default:
//       return state;
//   }
// };

// export const createAnecdote = (content) => {
//   return {
//     type: "NEW_ANECDOTE",
//     payload: {
//       content,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };

// export default reducer;

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1;
      }
    },
    createAnecdote: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(content) {
        return {
          payload: {
            content,
            id: getId(),
            votes: 0,
          },
        };
      },
    },
  },
});

export const { vote, createAnecdote } = anecdotesSlice.actions;

export default anecdotesSlice.reducer;
