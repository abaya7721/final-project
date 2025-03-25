import { Navigate } from "react-router-dom";

const SecureRoute = ({component}) =>{
    const role = localStorage.getItem("role");
    const isAuthenticated = role === "ROLE_ADMIN";
    return isAuthenticated ? component : <Navigate to="/" />
}

export default SecureRoute;