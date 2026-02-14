import { Navigate } from "react-router-dom";
import { useAuth } from "../../hoc/auth-context";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { userData, user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}