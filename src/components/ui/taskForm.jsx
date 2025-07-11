import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useCreateTodo, useUpdateTodo } from "@/services/queries";
import { taskSchema } from "../features/new-task/schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Flag, FileText } from "lucide-react";

function TaskForm({ onCloseForm, initialData, update = "create" }) {
  const { mutate: createTask, isPending: isCreating } = useCreateTodo();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTodo();
  const navigate = useNavigate();

  const isEditMode = Boolean(initialData);
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "LOW",
      status: "TODO",
    },
  });

  useEffect(() => {
    if (initialData) {
      console.log("Initial data priority:", initialData.priority);
      reset({
        name: initialData.name || "",
        description: initialData.description || "",
        priority: initialData.priority?.toUpperCase() || "LOW",
        status: initialData.status || "TODO",
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const mutation = isEditMode ? updateTask : createTask;
    mutation(
      isEditMode
        ? { id: initialData.id, status: initialData.status, ...data }
        : data,
      {
        onSuccess: () => {
          reset();
          if (update === "detail") navigate("/home");
          onCloseForm?.();
        },
      }
    );
  };

  return (
    <form
      key={initialData?.id || "new"}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Title */}
      <div className="space-y-2 ">
        <Label
          htmlFor="title"
          className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          Title
        </Label>
        <Input
          {...register("name", { maxLength: 50 })}
          id="title"
          placeholder="Enter task title..."
          className={`border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 ${
            errors.name
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }            
              `}
        />
        {errors.name && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Description
        </Label>

        <Textarea
          {...register("description", { maxLength: 50 })}
          id="description"
          placeholder="Describe your task in detail..."
          rows={4}
          className={`w-full border-slate-200 whitespace-pre-wrap dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 resize-none `}
        />
      </div>
      {errors.description && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.description.message}
        </p>
      )}

      {/* Priority  */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
          <Flag className="w-4 h-4 mr-2" />
          Priority
        </Label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-2" />
                    Low Priority
                  </div>
                </SelectItem>
                <SelectItem value="MEDIUM">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full mr-2" />
                    Medium Priority
                  </div>
                </SelectItem>
                <SelectItem value="HIGH">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full mr-2" />
                    High Priority
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.priority && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.priority.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 cursor-pointer"
        >
          {isPending ? (
            <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
          ) : isEditMode ? (
            "Update Task"
          ) : (
            "Create Task"
          )}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;
