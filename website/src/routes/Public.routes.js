import { Navigate } from "react-router-dom";

const PublicRoute = ({ element: Element }) => {
    const email = localStorage.getItem("email");

    return !email ? <Element /> : <Navigate to="/chat" replace />;
};

export default PublicRoute;