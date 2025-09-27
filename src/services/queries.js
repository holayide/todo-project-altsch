import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createTodo,
  deleteTodo,
  loginUser,
  registerUser,
  toggleTodo,
  updateTodo,
} from "./api";

// register
export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      toast.success("Registration successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

// login
export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      toast.success("Login successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

// toggle
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

// toggle-details
export const useToggleDetailTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => toggleTodo(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(["todos", id]);
    },
    onError: (error) => {
      console.error("Toggle failed:", error.message);
    },
  });
};

// create
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log("Create failed:", error.message);
    },
  });
};

// update
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log("Create failed:", error.message);
    },
  });
};

// delete
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
