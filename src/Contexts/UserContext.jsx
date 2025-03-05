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
  const [authToken, setAuthToken] = useState(() => {
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.error("Storage access error:", error);
      return null;
    }
  });

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("token", authToken);
    } else {
      localStorage.removeItem("token"); // Clear token when user logs out
    }
  }, [authToken]);
  
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
    console.log("fetchCurrentUser function called"); // Ensure function runs

    let token = localStorage.getItem("token");
    console.log("Retrieved token from localStorage:", token);

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

        console.log("Response received:", response);

        if (response.status === 401) {
            console.log("Token expired. Trying refresh...");
            const refreshToken = localStorage.getItem("refresh_token");
            console.log("Refresh token:", refreshToken);

            const refreshResponse = await fetch("http://127.0.0.1:5000/refresh", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${refreshToken}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Refresh response:", refreshResponse);

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                console.log("New token received:", refreshData.access_token);
                localStorage.setItem("token", refreshData.access_token);
                return fetchCurrentUser(); // Retry with new token
            } else {
                console.log("Refresh token failed. Redirecting to login...");
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }
        }

        if (!response.ok) {
            console.error("Failed to fetch user:", response.status);
            return;
        }

        const userData = await response.json();
        console.log("Fetched user data:", userData);
        return userData;

    } catch (error) {
        console.error("Error fetching user:", error);
    }
};


  // 🔹 Login Function
  const login = async (email, password) => {
    if (!email || !password) {
      console.error("Email or password is missing");
      return null;  // 🔹 Return null explicitly if inputs are missing
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Login response data:", data);
  
      if (data.access_token) {
        localStorage.setItem("authToken", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setAuthToken(data.access_token);
        setCurrentUser(data.user);
  
        // ✅ Fetch and update user details immediately after login
        // await fetchCurrentUser();
  
        toast.success("Login successful");
        return data; // 🔹 Ensure data is returned here
      }
    } catch (error) {  // ✅ Catch block properly closes try block
      console.error("Login Error:", error);
      toast.error("Login request failed");
      return null; // 🔹 Return null in case of error
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

    // 🔹 Update Current User Function
  const updateUser = async (updatedUserData) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/update_user", {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const updatedUser = await response.json();
    setCurrentUser(updatedUser); // Update user context with new data
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Update local storage
    toast.success("User updated successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Failed to update user");
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
        logOutGoogleUser,
        setCurrentUser, authToken, setAuthToken,
        fetchCurrentUser,
        updateUser
      }}
      // authToken, setAuthToken, currentUser, setCurrentUser, login, googleSignIn
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;