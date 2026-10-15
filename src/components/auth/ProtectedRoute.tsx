import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FullPageSpinner } from "../ui";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  // تا زمانی که initialization تموم نشده، صبر کن
  if (isInitializing) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    // مسیر فعلی رو ذخیره کن که بعد از لاگین بهش برگردیم
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}