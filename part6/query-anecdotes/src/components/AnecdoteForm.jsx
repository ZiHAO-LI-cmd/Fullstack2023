import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../../requests";
import { useNotification } from "../reducers/NotificationContext";

const getId = () => (100000 * Math.random()).toFixed(0);

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdote = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdote.concat(newAnecdote));
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();

    // Check if the content is at least 5 characters long
    if (content.length < 5) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          message: "Anecdote content must be at least 5 characters long.",
          type: "error",
        },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_NOTIFICATION" });
      }, 5000);
      return;
    }

    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
