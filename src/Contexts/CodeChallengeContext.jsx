import { createContext, useContext, useState, useEffect } from "react";

const CodeChallengeContext = createContext();

export const useCodeChallenges = () => useContext(CodeChallengeContext);

export const CodeChallengeProvider = ({ children }) => {
  const [codeChallenges, setCodeChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("token"); // Adjust based on auth setup

  // Fetch all code challenges
  const fetchCodeChallenges = async () => {
    setLoading(true);
    try {
      const API_URL = "http://127.0.0.1:5000/code-challenges"; // Adjust based on backend URL
      const authToken = localStorage.getItem("authToken"); // Ensure token is set
  
      if (!authToken) {
        console.error("No auth token found. User may need to log in.");
        return;
      }
  
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      setCodeChallenges(data);
    } catch (error) {
      console.error("Error fetching code challenges:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Create a new code challenge
  const createCodeChallenge = async (challengeData) => {
    try {
      const response = await fetch("/code-challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(challengeData),
      });
      if (response.ok) fetchCodeChallenges();
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
  };

  // Update a code challenge
  const updateCodeChallenge = async (id, updatedData) => {
    try {
      await fetch(`/code-challenges/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedData),
      });
      fetchCodeChallenges();
    } catch (error) {
      console.error("Error updating challenge:", error);
    }
  };

  // Delete a code challenge
  const deleteCodeChallenge = async (id) => {
    try {
      await fetch(`/code-challenges/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      fetchCodeChallenges();
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
  };

  useEffect(() => {
    fetchCodeChallenges();
  }, []);

  return (
    <CodeChallengeContext.Provider
      value={{ codeChallenges, createCodeChallenge, updateCodeChallenge, deleteCodeChallenge, loading }}
    >
      {children}
    </CodeChallengeContext.Provider>
  );
};
