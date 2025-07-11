import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

function PageNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <p className="text-base font-semibold tracking-wider text-slate-600 dark:text-slate-300">
          SEEMS LIKE YOU ARE LOST
        </p>

        <h1 className=" text-[100px] sm:text-[200px] tracking-widest font-bold text-slate-800 dark:text-slate-100 mb-4">
          404
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-300 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        <Button asChild variant="default" className="gap-2">
          <Link to="/">
            <Home className="w-4 h-4" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
