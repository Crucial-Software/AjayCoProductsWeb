import React from 'react';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component, userRole }) => {

    const loginid = localStorage.getItem("userLoginId");
    const role = localStorage.getItem("userRole");

    if (loginid !== null) {
        if (userRole.includes(role)) {
            return <Component />;
        } else {
            if (role === "admin") {
                return <Navigate to="/dashboard" />
            } else {
                return <Navigate to="/home" />
            }
        }
    } else {
        return <Navigate to="/login" />
    }

};
export default PrivateRoute;