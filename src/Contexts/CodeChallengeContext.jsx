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
    const response = await fetch("/code-challenges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        assessment_id: challengeData.assessment_id, // Ensure this is included
        task: challengeData.task,
        example: challengeData.example,
        input_format: challengeData.inputFormat,
        output_format: challengeData.outputFormat,
        constraints: challengeData.constraints,
        sample_input_1: challengeData.sampleInput_1,
        sample_input_2: challengeData.sampleInput_2,
        sample_input_3: challengeData.sampleInput_3,
        sample_input_4: challengeData.sampleInput_4,
        sample_output_1: challengeData.sample_output_1,
        sample_output_2: challengeData.sample_output_2,
        sample_output_3: challengeData.sample_output_3,
        sample_output_4: challengeData.sample_output_4,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating challenge:", errorData);
      return;

    }

    fetchCodeChallenges(); // Refresh the challenge list
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
