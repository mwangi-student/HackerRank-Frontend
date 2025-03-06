import React, { createContext, useState, useEffect, useContext } from "react";
import  UserContext  from "./UserContext";

const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
    const { authToken } = useContext(UserContext);
    const [questions, setQuestions] = useState([]);

    // Fetch all questions
    useEffect(() => {
        if (authToken) {
            fetch("http://127.0.0.1:5000/questions", {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error("Failed to fetch questions", error));
        }
    }, [authToken]);

// Add a new question
const addQuestion = async (questionData) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                assessment_id: questionData.assessment_id, // Ensure it's included
                question_text: questionData.question_text,
                choice_a: questionData.choice_a,
                choice_b: questionData.choice_b,
                choice_c: questionData.choice_c,
                choice_d: questionData.choice_d,
                correct_answer: questionData.correct_answer,
            }),
        });

        const responseData = await response.json();

        if (response.ok) {
            setQuestions((prev) => [
                ...prev,
                { ...questionData, id: responseData.id }, // Ensure new question is structured correctly
            ]);
            return { success: true, message: "Question added successfully" };
        } else {
            console.error("Failed to add question:", responseData);
            return { success: false, message: responseData.error || "Failed to add question" };
        }
    } catch (error) {
        console.error("Error adding question:", error);
        return { success: false, message: "Error adding question" };
    }
};


    // Delete a question
    const deleteQuestion = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/questions/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${authToken}` }
            });
            
            if (response.ok) {
                setQuestions(prev => prev.filter(question => question.id !== id));
                return { success: true, message: "Question deleted successfully" };
            } else {
                return { success: false, message: "Failed to delete question" };
            }
        } catch (error) {
            console.error("Error deleting question:", error);
            return { success: false, message: "Error deleting question" };
        }
    };

    return (
        <QuestionsContext.Provider value={{ questions, addQuestion, deleteQuestion }}>
            {children}
        </QuestionsContext.Provider>
    );
};

export default QuestionsContext;
