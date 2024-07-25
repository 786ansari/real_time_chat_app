import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ element: Element }) => {
    const email = localStorage.getItem("email")
  
    return email ? <Element /> : <Navigate to="/login" replace />;
  };
