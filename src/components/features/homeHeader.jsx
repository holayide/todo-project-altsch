// import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";

import { Plus } from "lucide-react";

function HomeHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          My Tasks
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Organize and track your daily tasks efficiently
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <ThemeToggle />
        {/* /todo/new */}
        {/* <Link to="#"> */}
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-lg cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Task
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default HomeHeader;
