import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

// Create AssessmentInvite Context
const AssessmentInviteContext = createContext();

export const AssessmentInviteProvider = ({ children }) => {
    const { authToken } = useContext(UserContext);
    const [assessmentInvites, setAssessmentInvites] = useState([]);

    // Fetch assessment invites
    useEffect(() => {
        if (authToken) {
            axios.get("http://127.0.0.1:5000/assessment-invite", {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            .then((response) => setAssessmentInvites(response.data))
            .catch((error) => console.error("Failed to fetch assessment invites", error.response?.data || error.message));
        }
    }, [authToken]);

    // Function to send an assessment invite
    const sendAssessmentInvite = async (inviteData) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/assessment-invite", inviteData, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            if (response.status === 201) {
                setAssessmentInvites((prevInvites) => [...prevInvites, response.data]);
                return { success: true, message: "Assessment invite sent successfully" };
            }
        } catch (error) {
            console.error("Failed to send assessment invite", error.response?.data || error.message);
            return { success: false, message: "Failed to send assessment invite" };
        }
    };

    // Function to delete an assessment invite
    const deleteAssessmentInvite = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/assessment-invite/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            setAssessmentInvites((prevInvites) => prevInvites.filter((invite) => invite.id !== id));
        } catch (error) {
            console.error("Error deleting assessment invite:", error.response?.data || error.message);
        }
    };

    return (
        <AssessmentInviteContext.Provider value={{ assessmentInvites, sendAssessmentInvite, deleteAssessmentInvite }}>
            {children}
        </AssessmentInviteContext.Provider>
    );
};

export default AssessmentInviteContext;
