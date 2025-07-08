import { Outlet } from "react-router-dom";
// import Header from "../features/header";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-slate-900 dark:to-slate-800">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
