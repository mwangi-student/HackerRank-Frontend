import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Track active modal

  // Function to toggle between Login and Register
  const toggleModal = () => {
    console.log("Toggling modal");
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      {isLogin ? (
        <Login onClose={onClose} onToggle={toggleModal} />
      ) : (
        <Register onClose={onClose} onToggle={toggleModal} />
      )}
    </>
  );
};

export default AuthModal;
