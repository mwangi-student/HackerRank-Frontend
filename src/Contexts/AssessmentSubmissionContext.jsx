import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import  UserContext  from "./UserContext";
import AssessmentContext  from "./AssessmentContext"; // Import for assessment_id

const AssessmentSubmissionContext = createContext();

export const AssessmentSubmissionProvider = ({ children }) => {
    const { authToken, user } = useContext(UserContext); // Get authToken & user data (includes student_id)
    const { assessments } = useContext(AssessmentContext); // Get assessments to extract assessment_id

    const [submissions, setSubmissions] = useState([]);

    // Fetch all submissions
    useEffect(() => {
        if (authToken) {
            axios.get("http://127.0.0.1:5000/submission", {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            .then((response) => setSubmissions(response.data))
            .catch((error) => console.error("Failed to fetch submissions", error));
        }
    }, [authToken]);

    // Fetch a single submission by ID
    const getSubmission = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/submission/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch submission", error.response?.data || error.message);
            return null;
        }
    };

    // Submit an assessment
    const submitAssessment = async ({ assessmentId, submissionType, answer, questionId, codeChallengeId }) => {
        if (!user?.student_id) {
            return { success: false, message: "Missing student ID" };
        }
        if (!assessmentId) {
            return { success: false, message: "Missing assessment ID" };
        }

        // Construct the submission payload
        const submissionData = {
            assessment_id: assessmentId,
            student_id: user.student_id,
            answer: answer,
        };

        // Add the correct ID based on submission type
        if (submissionType === "mcq") {
            if (!questionId) return { success: false, message: "Missing question ID for MCQ submission" };
            submissionData.question_id = questionId;
        } else if (submissionType === "code") {
            if (!codeChallengeId) return { success: false, message: "Missing code challenge ID for code submission" };
            submissionData.code_challenge_id = codeChallengeId;
        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/submission", submissionData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                },
            });

            if (response.status === 201) {
                setSubmissions((prev) => [...prev, response.data]);
                return { success: true, message: "Submission successful" };
            }
        } catch (error) {
            console.error("Failed to submit assessment", error.response?.data || error.message);
        }
        return { success: false, message: "Failed to submit assessment" };
    };

    // Delete a submission
    const deleteSubmission = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/submission/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            if (response.status === 200) {
                setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
            }
        } catch (error) {
            console.error("Error deleting submission:", error.response?.data || error.message);
        }
    };

    return (
        <AssessmentSubmissionContext.Provider value={{ submissions, getSubmission, submitAssessment, deleteSubmission }}>
            {children}
        </AssessmentSubmissionContext.Provider>
    );
};

export default AssessmentSubmissionContext;
