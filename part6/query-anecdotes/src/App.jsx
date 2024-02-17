/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-02-17 16:05:56
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-17 23:29:14
 * @FilePath: \Fullstack2023\part6\query-anecdotes\src\App.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "../requests";
import { useNotification } from "./reducers/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const updateNoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    updateNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    console.log("vote");
    // Dispatch a success notification
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { message: "New anecdote created!", type: "success" },
    });

    // Optionally, remove the notification after a delay
    setTimeout(() => {
      dispatch({ type: "REMOVE_NOTIFICATION" });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  // const anecdotes = [
  //   {
  //     content: "If it hurts, do it more often",
  //     id: "47145",
  //     votes: 0,
  //   },
  // ];

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
