import { fetchTasks } from "./api";

export const useTasksQueryOptions = ({
  page = 1,
  name = "",
  status = "",
  priority = "",
  loadAll = false,
} = {}) => {
  return {
    queryKey: ["tasks", loadAll ? "all" : page, name, status, priority],
    queryFn: () =>
      fetchTasks({
        page: loadAll ? 1 : page,
        all: loadAll,
        name,
        status,
        priority,
      }),
    keepPreviousData: true,
  };
};
