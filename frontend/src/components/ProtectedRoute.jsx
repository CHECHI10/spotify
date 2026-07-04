import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-ink-950">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>

        <p className="mt-5 text-neutral-400">
          Loading your music...
        </p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
