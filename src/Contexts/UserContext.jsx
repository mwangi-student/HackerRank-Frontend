import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(() =>
    sessionStorage.getItem("token")
  );
  const [students, setStudents] = useState([]);
  const [tms, setTms] = useState([]);

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

      sessionStorage.setItem("token", token);
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

      await axios.post(
        "http://127.0.0.1:5000/logout",
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );

      sessionStorage.removeItem("token");
      setCurrentUser(null);
      setAuthToken(null);
      setStudents([]);
      setTms([]);
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
    }
  };

  // General function to get auth headers
  const getAuthHeaders = () => {
    return {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    };
  };

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

  //================================================ Update Student Details
  const updateStudent = async (id, updatedData) => {
    try {
      const response = await axios.patch(`/students/${id}`, updatedData, {
        headers: getAuthHeaders()
      });
      if (response.status === 200) {
        setStudents((prevStudents) =>
          prevStudents.map((s) => (s.id === id ? response.data.student : s))
        );
        return { success: true, message: "Student updated successfully" };
      }
    } catch (error) {
      console.error("Student update error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update student"
      };
    }
  };

  //================================================ Update TM Details
  const updateTM = async (id, updatedData) => {
    try {
      const response = await axios.patch(`/tm/${id}`, updatedData, {
        headers: getAuthHeaders()
      });
      if (response.status === 200) {
        setTms((prevTms) =>
          prevTms.map((tm) => (tm.id === id ? { ...tm, ...updatedData } : tm))
        );
        return { success: true, message: "TM updated successfully" };
      }
    } catch (error) {
      console.error("TM update error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update TM"
      };
    }
  };

  //================================================ Delete a TM
  const deleteTM = async (id) => {
    try {
      await axios.delete(`/tm/${id}`, { headers: getAuthHeaders() });
      setTms((prevTms) => prevTms.filter((tm) => tm.id !== id));
      return { success: true, message: "TM deleted successfully" };
    } catch (error) {
      console.error("TM deletion error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete TM"
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
        updateStudent,
        updateTM,
        deleteTM
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
