import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {

    const loginid = localStorage.getItem("userLoginId");
    const role = localStorage.getItem("userRole");

    if (loginid == null) {
        return <Component />;
    } else {
        if (role === "admin") {
            return <Navigate to="/dashboard" />
        } else {
            return <Navigate to="/home" />
        }
    }
}
export default ProtectedRoute;