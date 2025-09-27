import axios from "axios";
import api from "./auth";

// REGISTER
export async function registerUser(data) {
  try {
    const res = await api.post(`/auth/register`, data);
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || "Failed to register user");
  }
}

// Login
export async function loginUser(data) {
  try {
    const res = await api.post(`/auth/login`, data);
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || "Failed to login user");
  }
}

// FETCH TASK
export async function fetchTasks({
  page = 1,
  name = "",
  status = "",
  priority = "",
  all = false,
}) {
  try {
    const response = await api.get("/tasks", {
      params: {
        page,
        ...(name && { name }),
        ...(all ? { all: true } : { page }),
        ...(status && { status }),
        ...(priority && { priority }),
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // 404 error
        throw new Error(
          `API Error: ${error.response.status} - ${
            error.response.data?.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        // Request was made but no response received
        throw new Error("Network Error: No response from server");
      } else {
        throw new Error(`Request Error: ${error.message}`);
      }
    } else {
      throw new Error("Unknown error occurred");
    }
  }
}

// FETCH BY ID
export async function fetchTaskById(id) {
  try {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || "Failed to Task");
  }
}

// CREATE
export async function createTodo(task) {
  try {
    const res = await api.post("/tasks", task);
    return res.data;
  } catch (e) {
    // console.error("Create API Error:", e.response?.data || e.message);
    throw new Error(e.response?.data?.message || "Failed to create task");
  }
}

// UPDATE
export async function updateTodo({ id, ...data }) {
  try {
    const res = await api.patch(`/tasks/${id}`, data);
    return res.data;
  } catch (e) {
    // console.error("Create API Error:", e.response?.data || e.message);
    throw new Error(e.response?.data?.message || "Failed to update task");
  }
}

// DELETE
export async function deleteTodo(id) {
  try {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
  } catch (e) {
    // console.error("Create API Error:", e.response?.data || e.message);
    throw new Error(e.response?.data?.message || "Failed to update task");
  }
}

//TOGGLE
export async function toggleTodo(id, currentStatus) {
  try {
    const newStatus = currentStatus === "TODO" ? "DONE" : "TODO";

    const res = await api.patch(
      `/tasks/${id}`,
      {
        status: newStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || "Failed to toggle status");
  }
}
