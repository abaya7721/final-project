import { Navigate } from "react-router-dom";

export const SecureRoute = ({component}) =>{
    const role = localStorage.getItem("role");
    const isAuthenticated = role === "ROLE_ADMIN" || role === "ROLE_USER";
    return isAuthenticated ? component : <Navigate to="/" />
}