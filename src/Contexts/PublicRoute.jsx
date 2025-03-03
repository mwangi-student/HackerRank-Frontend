import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Contexts/UserContext";

const PublicRoute = ({ element }) => {
    const { currentUser } = useContext(UserContext); // Get user data from context

  return currentUser ? <Navigate to="/prepare" /> : element;
};

export default PublicRoute;
