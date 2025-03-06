import { createContext, useContext, useState, useEffect } from "react";

const CodeChallengeContext = createContext();

export const useCodeChallenges = () => useContext(CodeChallengeContext);

export const CodeChallengeProvider = ({ children }) => {
  const [codeChallenges, setCodeChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("authToken"); // Ensure correct token retrieval

  // Fetch all code challenges
  const fetchCodeChallenges = async () => {
    setLoading(true);
    try {
      const API_URL = "http://127.0.0.1:5000/code-challenges";
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

  // Fetch a single code challenge
  const getCodeChallenge = async (id) => {
    try {
      if (!authToken) {
        console.error("No auth token found. User may need to log in.");
        return null;
      }

      const response = await fetch(`http://127.0.0.1:5000/code-challenges/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching single code challenge:", error);
      return null;
    }
  };

  // Create a new code challenge
  const createCodeChallenge = async (challengeData) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/code-challenges", {
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
      await fetch(`http://127.0.0.1:5000/code-challenges/${id}`, {
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
      await fetch(`http://127.0.0.1:5000/code-challenges/${id}`, {
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
      value={{
        codeChallenges,
        getCodeChallenge, // Now available for fetching a single challenge
        createCodeChallenge,
        updateCodeChallenge,
        deleteCodeChallenge,
        loading,
      }}
    >
      {children}
    </CodeChallengeContext.Provider>
  );
};
