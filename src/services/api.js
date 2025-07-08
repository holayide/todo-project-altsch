import axios from "axios";

const BASE_URL = "https://api.oluwasetemi.dev/tasks";

export async function fetchTasks({
  page = 1,
  name = "",
  status = "",
  priority = "",
  all = false,
}) {
  try {
    const response = await axios.get(BASE_URL, {
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

// CREATE
export async function createTodo(task) {
  const res = await axios.post(BASE_URL, task);
  return res.data;
}

// UPDATE
export async function updateTodo(id, data) {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
}

// DELETE
export async function deleteTodo(id) {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
}

//TOGGLE
export async function toggleTodo(id, currentStatus) {
  try {
    const newStatus = currentStatus === "TODO" ? "DONE" : "TODO";

    const res = await axios.patch(
      `${BASE_URL}/${id}`,
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
