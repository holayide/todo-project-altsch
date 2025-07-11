import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { AlertTriangle } from "lucide-react";

function ErrorPage({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto border border-rose-200 dark:border-rose-900/50 rounded-xl bg-white dark:bg-slate-800/90 shadow-lg p-8">
        <div className="mx-auto mb-6 w-20 h-20 bg-rose-500/10 dark:bg-rose-900/20 rounded-full flex items-center justify-center animate-pulse">
          <AlertTriangle className="w-10 h-10 text-rose-600 dark:text-rose-400" />
        </div>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          Unexpected Error
        </h1>

        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Something went wrong. We've logged the issue and are working on it.
        </p>

        <details className="mb-6 text-left">
          <summary className="text-sm text-rose-600 dark:text-rose-400 cursor-pointer">
            Technical Details
          </summary>
          <pre className="mt-2 p-3 bg-slate-50 dark:bg-slate-700 rounded text-xs text-slate-500 dark:text-slate-300 overflow-x-auto">
            {error.message}
          </pre>
        </details>

        <Button
          onClick={resetErrorBoundary}
          variant="default"
          className="gap-2 bg-rose-600 hover:bg-rose-700"
        >
          <RefreshCw className="w-4 h-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
