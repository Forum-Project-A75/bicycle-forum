import { Navigate } from "react-router-dom";
import { useAuth } from "../../hoc/auth-context.jsx";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { userData, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}