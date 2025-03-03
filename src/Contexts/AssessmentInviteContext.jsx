import React, { createContext, useState, useEffect, useContext } from "react";
import  UserContext  from "./UserContext";
import  AssessmentContext  from "./AssessmentContext";

// Create AssessmentInvite Context
const AssessmentInviteContext = createContext();

export const AssessmentInviteProvider = ({ children }) => {
    const { authToken, user } = useContext(UserContext); // Assuming user contains student_id
    const { currentAssessment } = useContext(AssessmentContext); // Assuming it contains assessment_id and tm_id

    const [assessmentInvites, setAssessmentInvites] = useState([]);

    // Fetch assessment invites
    useEffect(() => {
        const fetchAssessmentInvites = async () => {
            if (!authToken) return;
            try {
                const response = await fetch("http://127.0.0.1:5000/assessment-invites", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${authToken}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setAssessmentInvites(data);
                } else {
                    console.error("Failed to fetch assessment invites");
                }
            } catch (error) {
                console.error("Error fetching assessment invites:", error);
            }
        };

        fetchAssessmentInvites();
    }, [authToken]);

    // Function to send an assessment invite
    const sendAssessmentInvite = async () => {
        if (!user?.id || !currentAssessment?.assessment_id || !currentAssessment?.tm_id) {
            return { success: false, message: "Missing required invite details" };
        }

        const inviteData = {
            student_id: user.id,
            assessment_id: currentAssessment.assessment_id,
            tm_id: currentAssessment.tm_id
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/assessment-invites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify(inviteData)
            });

            if (response.ok) {
                const newInvite = await response.json();
                setAssessmentInvites((prevInvites) => [...prevInvites, newInvite]);
                return { success: true, message: "Assessment invite sent successfully" };
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData.error || "Failed to send assessment invite" };
            }
        } catch (error) {
            console.error("Failed to send assessment invite", error);
            return { success: false, message: "Failed to send assessment invite" };
        }
    };

    // Function to delete an assessment invite
    const deleteAssessmentInvite = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/assessment-invites/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${authToken}` }
            });

            if (response.ok) {
                setAssessmentInvites((prevInvites) => prevInvites.filter((invite) => invite.id !== id));
            } else {
                console.error("Failed to delete assessment invite");
            }
        } catch (error) {
            console.error("Error deleting assessment invite:", error);
        }
    };

    return (
        <AssessmentInviteContext.Provider value={{ assessmentInvites, sendAssessmentInvite, deleteAssessmentInvite }}>
            {children}
        </AssessmentInviteContext.Provider>
    );
};

export default AssessmentInviteContext;
