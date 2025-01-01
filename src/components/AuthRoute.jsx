import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const validUser = localStorage.getItem("validUser") === "true";

  if (!token) {
    return <Navigate to="/signup" state={{ from: location }} />;
  }

  if (token && !validUser) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
