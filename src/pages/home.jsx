import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Cards from "@/components/features/summay-card/cards";
import HomeHeader from "@/components/features/header/homeHeader";
import SearchFilter from "@/components/features/search-filter/searchFilter";
import TodoCard from "@/components/features/todo-cards/todoCard";

import { useDebounce } from "@/hooks/debounce";
import { useTasksQueryOptions } from "@/services/queryOptions";
import Pagination from "@/components/features/pagination/pagination";

function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const debouncedSearch = useDebounce(searchQuery, 500);
  const isSearching = debouncedSearch.trim().length > 0;

  const { data, isLoading, isError, error } = useQuery(
    useTasksQueryOptions({
      page,
      name: debouncedSearch,
      status: statusFilter === "all" ? "" : statusFilter,
      priority: priorityFilter === "all" ? "" : priorityFilter,
    })
  );

  // note: used Client-side search filtering too because the backend api keeps returning
  //  the whole content without filtering it
  const filteredTasks = (data?.data || []).filter((task) =>
    isSearching
      ? task.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      : true
  );

  const handlePageChange = (newpage) => {
    setPage(newpage);
  };

  // if (isLoading) return <div>Loading tasks...</div>;

  return (
    <div className="mb-8">
      <HomeHeader />
      <Cards page={page} />
      <SearchFilter
        searchQuery={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1);
        }}
        statusFilter={statusFilter}
        setStatusFilter={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        priorityFilter={priorityFilter}
        setPriorityFilter={(value) => {
          setPriorityFilter(value);
          setPage(1);
        }}
      />

      <div className="mt-14 min-h-[200px]">
        {isError && (
          <div className="text-center text-red-500">
            Error loading tasks: {error.message}
          </div>
        )}

        {isLoading && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Loading tasks...
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {filteredTasks.length === 0 ? (
              <div className="mt-14 text-center text-gray-500 dark:text-gray-400">
                {isSearching ? (
                  <p>No tasks found matching "{searchQuery}"</p>
                ) : (
                  <p>No tasks available</p>
                )}
              </div>
            ) : (
              <>
                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredTasks.map((todo) => (
                    <TodoCard key={todo.id} todo={todo} />
                  ))}
                </div>

                {!isSearching && (
                  <div className="mt-14">
                    <Pagination data={data} onPageChange={handlePageChange} />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
