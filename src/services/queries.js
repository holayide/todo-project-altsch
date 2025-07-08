import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTodo } from "./api";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => toggleTodo(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
    onError: (error) => {
      console.error("Toggle failed:", error.message);
    },
  });
};
