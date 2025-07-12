import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchTaskById } from "@/services/api";
import {
  DetailHeader,
  DetailPageSkeleton,
  TaskDetail,
  TaskInfo,
} from "@/components/features/detail-page";

function DetailPage() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id),
  });

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto  px-4 py-8 max-w-4xl">
        {isError && (
          <div className="text-center text-red-500">
            Error loading tasks: {error.message}
          </div>
        )}

        {isLoading && <DetailPageSkeleton />}

        {!isLoading && !isError && (
          <>
            <DetailHeader data={data} />

            <div className="pt-6 xs:pt-10 flex flex-col gap-8">
              <TaskDetail data={data} />
              <TaskInfo data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailPage;
