import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

// Create Discussion Context
const DiscussionContext = createContext();

export const DiscussionProvider = ({ children }) => {
    const { authToken } = useContext(UserContext);
    const [discussion, setDiscussion] = useState([]);

    // Fetch discussions
    useEffect(() => {
        if (authToken) {
            axios.get("http://127.0.0.1:5000/discussion", {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            .then((response) => setDiscussion(response.data))
            .catch((error) => console.error("Failed to fetch discussion", error.response?.data || error.message));
        }
    }, [authToken]);

    // Function to submit a discussion
    const submitDiscussion = async (feedbackData) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/discussion", feedbackData, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            if (response.status === 201) {
                setDiscussion((prevDiscussion) => [...prevDiscussion, response.data]);
                return { success: true, message: "Discussion submitted successfully" };
            }
        } catch (error) {
            console.error("Failed to submit discussion", error.response?.data || error.message);
            return { success: false, message: "Failed to submit discussion" };
        }
    };

    // Function to delete a discussion
    const deleteDiscussion = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/discussion/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            setDiscussion((prevDiscussion) => prevDiscussion.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting discussion:", error.response?.data || error.message);
        }
    };

    return (
        <DiscussionContext.Provider value={{ discussion, submitDiscussion, deleteDiscussion }}>
            {children}
        </DiscussionContext.Provider>
    );
};

export default DiscussionContext;
