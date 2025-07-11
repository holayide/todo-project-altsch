import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchTaskById } from "@/services/api";
import {
  DetailHeader,
  TaskDetail,
  TaskInfo,
} from "@/components/features/detail-page";

function DetailPage() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto  px-4 py-8 max-w-4xl">
        <DetailHeader data={data} />

        <div className="pt-10 flex flex-col gap-8">
          <TaskDetail data={data} />
          <TaskInfo data={data} />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
