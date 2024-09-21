import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
    const loginid = localStorage.getItem("userLoginId");

    if (loginid !== null) {
        return <Component />;
    } else {
        return <Navigate to="/login" />
    }
}
export default ProtectedRoute;