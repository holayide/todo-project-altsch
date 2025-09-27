import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import AppLayout from "./components/ui/appLayout";
import { DetailPage, Home, PageNotFound, TestError } from "./pages";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            // Default styles
            style: {
              background: "#1e293b",
              color: "#f8fafc",
              borderRadius: "8px",
              padding: "12px 16px",
            },
            success: {
              style: {
                background: "#16a34a",
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "#16a34a",
              },
            },
            error: {
              style: {
                background: "#dc2626",
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "#dc2626",
              },
            },
          }}
        />
        <Routes>
          <Route element={<AppLayout />}>
            {/* <Route index element={<Navigate replace to="home" />} /> */}
            <Route path="home" element={<Home />} />
            <Route path="todo/:id" element={<DetailPage />} />
          </Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="test-err" element={<TestError />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
