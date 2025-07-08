import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { formatDate, priorityColors } from "@/lib/helpers";
import { useToggleTodo } from "@/services/queries";

import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  CheckCircle2,
  Circle,
  Calendar,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function TodoCard({ todo }) {
  const { mutate: toggleStatus, isPending } = useToggleTodo();
  const {
    id,
    createdAt,
    name,
    priority: priorityValue,
    description,
    status: todoStatus,
  } = todo;

  const status = todoStatus.toLowerCase();
  const priority = priorityValue.toLowerCase();
  const priorityClasses =
    priorityColors[priority] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <Card
      className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-slate-800 dark:border-slate-700            
        ${status === "done" ? "opacity-75" : ""}
        `}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleStatus({ id, status: todoStatus })}
              className="p-0 h-auto hover:bg-transparent cursor-pointer"
            >
              {isPending ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-t-transparent border-slate-400" />
              ) : status === "done" ? (
                <CheckCircle2 className="w-4 h-5 text-green-600" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              )}
            </Button>
            <div className="w-5 flex-1 min-w-0">
              <h3
                className={`font-semibold text-slate-900 dark:text-slate-100 truncate ${
                  status === "done"
                    ? "line-through text-slate-500 dark:text-slate-400"
                    : ""
                }`}
              >
                {name}
              </h3>
            </div>
          </div>
          <Badge variant="outline" className={`ml-1 ${priorityClasses}`}>
            {priority}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p
          className={`text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 ${
            status === "done" ? "line-through" : ""
          }`}
        >
          {description || name || "No description"}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(createdAt)}
          </div>

          <div className="flex items-center space-x-1">
            {/* {`/todo/${todo.id}`} */}
            <Link to="#">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </Button>
            </Link>
            {/* {`/todo/${todo.id}/edit`} */}
            <Link href="#">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <Edit className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(todo.id)}
              className="h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
