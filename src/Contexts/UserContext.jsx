import { createContext, useState, useEffect } from "react";
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

// Create User Context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token")
  );
  const [students, setStudents] = useState([]);
  const [tms, setTms] = useState([]);

  // 🔹 Google Sign-In Function
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Google sign-in successful");
    } catch (error) {
      toast.error("Google sign-in failed: " + error.message);
    }
  };

  // 🔹 Logout Google User
  const logOutGoogleUser = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  // 🔹 Monitor Auth State (Checks if User is Logged In)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // 🔹 Fetch Current Authenticated User from Backend
  const fetchCurrentUser = async () => {
    // console.log("User state:", user);
    let token = localStorage.getItem("token");
  
    if (!token) {
      console.log("No auth token found");
      return;
    }
  
    try {
      console.log("Sending request with token:", token);
  
      const response = await fetch("http://127.0.0.1:5000/current_user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 401) {
        console.log("Token expired. Trying refresh...");
        const refreshResponse = await fetch("http://127.0.0.1:5000/refresh", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("refresh_token")}`,
            "Content-Type": "application/json",
          },
        });
  
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          localStorage.setItem("token", refreshData.access_token);
          token = refreshData.access_token;
          console.log("New token received:", token);
          return fetchCurrentUser(); // Retry fetch with new token
        } else {
          console.log("Refresh token failed. Redirecting to login...");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(errorData.msg || "Failed to fetch authenticated user");
      }
  
      const data = await response.json();
      console.log("Fetched user data:", data);
      setCurrentUser(data);
    } catch (error) {
      console.error("Error fetching authenticated user:", error);
    }
  };
  
  

  // 🔹 Login Function
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
      
      return { success: true, role: response.data.user.role };
    } catch (error) {
      toast.error("Invalid credentials");
      return { success: false };
    }
  };
  
  // 🔹 Logout Function
  const logout = async () => {
    console.log("Logout function triggered");
  
    try {
      if (!authToken) {
        console.log("No auth token found");
        toast.error("No authentication token found. Please log in.");
        return;
      }
  
      const response = await fetch("http://127.0.0.1:5000/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
  
      if (!response.ok) {
        throw new Error("Failed to log out");
      }
  
      console.log("Logout request successful");
      toast.success("Logged out successfully!");
  
      await signOut(auth);
      localStorage.removeItem("token");
  
      setCurrentUser(null);
      setAuthToken(null);
      setStudents([]);
      setTms([]);
  
      // setTimeout(() => {
      //   window.location.href = "/";
      // }, 2000); // Delay for better UX
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  
  

  // 🔹 Reset Password Function
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, new_password: newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      return data; // Successful password reset response
    } catch (error) {
      throw new Error(error.message || "Something went wrong");
    }
  };

  // 🔹 Register a New Student
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

  // 🔹 Add a TM (Teacher Mentor)
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

  // 🔹 Providing Context Values
  return (
    <UserContext.Provider
      value={{
        currentUser,
        students,
        tms,
        login,
        logout,
        resetPassword, // Added resetPassword to the context
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
