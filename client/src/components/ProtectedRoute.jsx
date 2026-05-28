import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Prevent flashing during auth check
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in
  return children;
};

export default ProtectedRoute;