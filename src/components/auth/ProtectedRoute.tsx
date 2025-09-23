import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    redirectPath?: string;
}

const ProtectedRoute = ({ children, redirectPath = "/login" }: ProtectedRouteProps) => {
    const token = localStorage.getItem("token");

    if (token !== "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjdlNjAxNTAwLWU0NzgtNGVlZC05NTczLTFjZjA0OWMwODhkNyIsImV4cCI6MTcxODc4NDU3M30.wADBMmCw7Zih_2cg_dlp9GcDHIrxuKHSWPnhIocKyVE") {
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
