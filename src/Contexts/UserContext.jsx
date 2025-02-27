import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../firebase";

import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token")
  );
  const [students, setStudents] = useState([]);
  const [tms, setTms] = useState([]);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logOutGoogleUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setCurrentUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //====================================== Fetch the currently authenticated user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!authToken) {
        console.warn("No token found, user not authenticated.");
        return;
      }
      try {
        const response = await axios.get("http://127.0.0.1:5000/current_user", {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error(
          "No authenticated user found",
          error.response?.data || error.message
        );
      }
    };
    fetchCurrentUser();
  }, [authToken]); // Re-run when authToken changes

  // ==============================================Login Function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password
      });
      const token = response.data.access_token;

      localStorage.setItem("token", token);
      setAuthToken(token); // Ensure state updates
      setCurrentUser(response.data.user);

      return { success: true, message: "Login successful" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Invalid credentials"
      };
    }
  };

  //================================================== Logout Function
  const logout = async () => {
    try {
      if (!authToken) {
        console.warn("No token found, user may already be logged out.");
        return;
      }

      // Logout from backend
      await axios.post(
        "http://127.0.0.1:5000/logout",
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      // Logout from Firebase (Google Auth)
      await signOut(auth);

      // Clear session and state
      localStorage.removeItem("token");
      setCurrentUser(null);
      setAuthToken(null);
      setStudents([]);
      setTms([]);
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
    }
  };
  console.log("hello");
  console.log(authToken);
  console.log(currentUser);

  // ===========================registering a student
  const registerStudent = async (studentData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/students",
        studentData,
        {
          headers: {
            ...getAuthHeaders(),
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

      if (response.status === 201) {
        setStudents((prevStudents) => [...prevStudents, response.data.student]);
        return { success: true, message: "Student registered successfully" };
      }
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "Failed to register student";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      return { success: false, message: errorMessage };
    }
  };

  //================================================ Add a TM
  const addTM = async (tmData) => {
    try {
      const response = await axios.post("/tm", tmData, {
        headers: getAuthHeaders()
      });
      if (response.status === 201) {
        setTms((prevTms) => [...prevTms, response.data]);
        return { success: true, message: "TM added successfully" };
      }
    } catch (error) {
      console.error("TM addition error:", error);
      return {
        success: false,
        message: error.response?.data?.error || "Failed to add TM"
      };
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
