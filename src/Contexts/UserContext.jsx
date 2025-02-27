import { createContext, useState, useEffect, useNavigate } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token")
  );
  const [students, setStudents] = useState([]);
  const [tms, setTms] = useState([]);

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Google sign-in successful");
    } catch (error) {
      toast.error("Google sign-in failed: " + error.message);
    }
  };

  const logOutGoogleUser = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!authToken) return;
      try {
        const response = await axios.get("http://127.0.0.1:5000/current_user", {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setCurrentUser(response.data);
      } catch (error) {
        // toast.error("Failed to fetch authenticated user");
      }
    };
    fetchCurrentUser();
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password
      });
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      setCurrentUser(response.data.user);
      toast.success("Login successful");
      return { success: true };
    } catch (error) {
      toast.error("Invalid credentials");
      return { success: false };
    }
  };

  const logout = async () => {
    console.log("Logout function triggered");
    try {
      if (!authToken) return;
      await axios.post(
        "http://127.0.0.1:5000/logout",
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      await signOut(auth);
      localStorage.removeItem("token");
      setCurrentUser(null);
      setAuthToken(null);
      setStudents([]);
      setTms([]);
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const registerStudent = async (studentData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/students",
        studentData,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
      setStudents((prev) => [...prev, response.data.student]);
      toast.success("Student registered successfully");
      return { success: true };
    } catch (error) {
      toast.error("Failed to register student");
      return { success: false };
    }
  };

  const addTM = async (tmData) => {
    try {
      const response = await axios.post("/tm", tmData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setTms((prev) => [...prev, response.data]);
      toast.success("TM added successfully");
      return { success: true };
    } catch (error) {
      toast.error("Failed to add TM");
      return { success: false };
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        students,
        tms,
        login,
        logout,
        registerStudent,
        addTM,
        googleSignIn,
        logOutGoogleUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
