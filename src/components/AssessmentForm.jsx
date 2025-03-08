import React, { useState } from "react";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

function AssessmentForm({ onClose }) {
    const [formData, setFormData] = useState({
        title: "",
        assessmentType: "",
        numberOfQuestions: 0,
        currentQuestionIndex: 0,
        mcqQuestions: [],
        currentMCQ: {
            question: "",
            choices: { a: "", b: "", c: "", d: "" },
            correctAnswer: "",
        },
        codeChallenge: {
            task: "",
            example: "",
            inputFormat: "",
            outputFormat: "",
            constraints: "",
            sampleInput_1: "",
            sampleInput_2: "",
            sampleInput_3: "",
            sampleInput_4: "",
            sample_output_1: "",
            sample_output_2: "",
            sample_output_3: "",
            sample_output_4: "",
        },
        publish: false,
    });

    // Handle general form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle MCQ question input changes
    const handleMCQChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            currentMCQ: {
                ...prev.currentMCQ,
                [name]: value,
            },
        }));
    };

    // Handle MCQ choices input changes
    const handleMCQChoicesChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            currentMCQ: {
                ...prev.currentMCQ,
                choices: {
                    ...prev.currentMCQ.choices,
                    [name]: value,
                },
            },
        }));
    };

    // Handle code challenge input changes
    const handleCodeChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            codeChallenge: {
                ...prev.codeChallenge,
                [name]: value,
            },
        }));
    };

    // Add a new MCQ question to the list
    const handleAddQuestion = () => {
        setFormData((prev) => ({
            ...prev,
            mcqQuestions: [...prev.mcqQuestions, prev.currentMCQ],
            currentQuestionIndex: prev.currentQuestionIndex + 1,
            currentMCQ: {
                question: "",
                choices: { a: "", b: "", c: "", d: "" },
                correctAnswer: "",
            },
        }));
    };

    // Fetch the current user using the token
    const fetchCurrentUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const response = await fetch("http://127.0.0.1:5000/current_user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 401) {
                const refreshToken = localStorage.getItem("refresh_token");
                const refreshResponse = await fetch("http://127.0.0.1:5000/refresh", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${refreshToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (refreshResponse.ok) {
                    const refreshData = await refreshResponse.json();
                    localStorage.setItem("token", refreshData.access_token);
                    return fetchCurrentUser();
                } else {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                    return null;
                }
            }

            if (!response.ok) return null;
            return await response.json();
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    };

    // Fetch assessment ID by title
    const fetchAssessmentId = async (title) => {
        const user = await fetchCurrentUser();
        if (!user) return null;

        try {
            const response = await fetch("http://127.0.0.1:5000/assessment", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) return null;
            const assessments = await response.json();
            const assessment = assessments.find((a) => a.title === title);
            return assessment ? assessment.id : null;
        } catch (error) {
            console.error("Error fetching assessments:", error);
            return null;
        }
    };

    // Submit MCQ questions to the backend
    const submitMCQQuestions = async (questions, assessmentId) => {
        const token = localStorage.getItem("token");
        if (!token || !assessmentId) return { success: false, message: "Missing token or assessmentId" };

        try {
            for (let question of questions) {
                const payload = {
                    assessment_id: assessmentId,
                    question_text: question.question,
                    choice_a: question.choices.a,
                    choice_b: question.choices.b,
                    choice_c: question.choices.c,
                    choice_d: question.choices.d,
                    correct_answer: question.correctAnswer,
                };

                const response = await fetch("http://127.0.0.1:5000/questions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) return { success: false, message: "Failed to submit question" };
            }
            return { success: true, message: "MCQs submitted successfully" };
        } catch (error) {
            console.error("Error submitting MCQs:", error);
            return { success: false, message: "Error submitting MCQs" };
        }
    };

    // Update assessment
    const updateAssessment = async (id, data) => {
        const token = localStorage.getItem("token");
        if (!token) return { success: false, message: "Missing token" };

        try {
            const response = await fetch(`http://127.0.0.1:5000/assessment/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) return { success: false, message: "Failed to update assessment" };
            return { success: true, message: "Assessment updated successfully" };
        } catch (error) {
            console.error("Error updating assessment:", error);
            return { success: false, message: "Error updating assessment" };
        }
    };

    // Create a code challenge
    const createCodeChallenge = async (challengeData) => {
        const authToken = localStorage.getItem("token"); // Retrieve token from localStorage
    
        try {
            console.log("Sending payload:", {
                assessment_id: challengeData.assessment_id,
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
            });

            const response = await fetch("http://127.0.0.1:5000/code-challenges", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    assessment_id: challengeData.assessment_id,
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
                return { success: false, message: errorData.error || "Failed to create challenge" };
            }
    
            return { success: true, message: "Code challenge created successfully" };
        } catch (error) {
            console.error("Error creating challenge:", error);
            return { success: false, message: "Error creating challenge" };
        }
    };
    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to create an assessment.");
            return;
        }
    
        try {
            // Prepare the assessment data
            const assessmentData = {
                title: formData.title,
                description: "Your description here", // Add a description field if needed
                difficulty: "Medium", // Set the difficulty level
                category: "General", // Set the category
                assessment_type: formData.assessmentType,
                publish: formData.publish,
                constraints: "Your constraints here", // Add constraints if needed
                time_limit: 60, // Set the time limit
            };
    
            // Send the assessment data to the Flask backend
            const response = await fetch("http://127.0.0.1:5000/assessment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(assessmentData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to create assessment.");
                return;
            }
    
            const assessment = await response.json();
    
            // If the assessment is successfully created, proceed to add questions or code challenges
            if (formData.assessmentType === "mcq") {
                const mcqQuestions = formData.mcqQuestions.map((question) => ({
                    assessment_id: assessment.id,
                    question_text: question.question,
                    choice_a: question.choices.a,
                    choice_b: question.choices.b,
                    choice_c: question.choices.c,
                    choice_d: question.choices.d,
                    correct_answer: question.correctAnswer,
                }));
    
                for (let question of mcqQuestions) {
                    const result = await addQuestion(question);
                    if (!result.success) {
                        toast.error("Failed to submit MCQs.");
                        return;
                    }
                }
            } else if (formData.assessmentType === "code") {
                const codeChallengeData = {
                    assessment_id: assessment.id,
                    task: formData.codeChallenge.task,
                    example: formData.codeChallenge.example,
                    input_format: formData.codeChallenge.inputFormat,
                    output_format: formData.codeChallenge.outputFormat,
                    constraints: formData.codeChallenge.constraints,
                    sample_input_1: formData.codeChallenge.sampleInput_1,
                    sample_input_2: formData.codeChallenge.sampleInput_2,
                    sample_input_3: formData.codeChallenge.sampleInput_3,
                    sample_input_4: formData.codeChallenge.sampleInput_4,
                    sample_output_1: formData.codeChallenge.sample_output_1,
                    sample_output_2: formData.codeChallenge.sample_output_2,
                    sample_output_3: formData.codeChallenge.sample_output_3,
                    sample_output_4: formData.codeChallenge.sample_output_4,
                };
    
                const result = await createCodeChallenge(codeChallengeData);
                if (!result.success) {
                    toast.error(result.message || "Failed to submit code challenge.");
                    return;
                }
            }
    
            // If the assessment is to be published, update the publish status
            if (formData.publish) {
                const updateResult = await updateAssessment(assessment.id, { publish: true });
                if (!updateResult.success) {
                    toast.error("Failed to publish assessment.");
                    return;
                }
            }
    
            toast.success("Assessment created and submitted successfully!");
            onClose();
        } catch (error) {
            console.error("Error creating assessment:", error);
            toast.error("An error occurred while creating the assessment.");
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg max-h-[90vh] overflow-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-2 rounded-lg w-full"
                        required
                    />

                    <div>
                        <label htmlFor="assessmentType" className="block mb-2 text-sm font-medium text-gray-900">
                            Type of Assessment
                        </label>
                        <select
                            id="assessmentType"
                            name="assessmentType"
                            value={formData.assessmentType}
                            onChange={handleChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>Choose type of assessment</option>
                            <option value="mcq">Multiple Choice Question</option>
                            <option value="code">Code Challenge Question</option>
                        </select>
                    </div>

                    {formData.assessmentType === "mcq" && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <label className="block text-sm font-medium">Number of Questions</label>
                            <input
                                type="number"
                                min="1"
                                name="numberOfQuestions"
                                value={formData.numberOfQuestions}
                                onChange={handleChange}
                                className="border p-2 rounded-lg w-full"
                            />

                            <h3 className="text-lg font-semibold mt-4">
                                Question {formData.currentQuestionIndex + 1} / {formData.numberOfQuestions}
                            </h3>

                            <textarea
                                name="question"
                                placeholder="Enter the question"
                                value={formData.currentMCQ.question}
                                onChange={handleMCQChange}
                                className="border p-2 rounded-lg w-full"
                                required
                            ></textarea>

                            {["a", "b", "c", "d"].map((choice) => (
                                <input
                                    key={choice}
                                    type="text"
                                    name={choice}
                                    placeholder={`Choice ${choice.toUpperCase()}`}
                                    value={formData.currentMCQ.choices[choice]}
                                    onChange={handleMCQChoicesChange}
                                    className="border p-2 rounded-lg w-full mt-1"
                                    required
                                />
                            ))}

                            <label className="block mt-3">Correct Answer</label>
                            <select
                                name="correctAnswer"
                                value={formData.currentMCQ.correctAnswer}
                                onChange={handleMCQChange}
                                className="block w-full p-2 border rounded-lg"
                                required
                            >
                                <option value="" disabled>Select correct answer</option>
                                {["a", "b", "c", "d"].map((choice) => (
                                    <option key={choice} value={choice}>{choice.toUpperCase()}</option>
                                ))}
                            </select>

                            {formData.currentQuestionIndex + 1 < formData.numberOfQuestions ? (
                                <button
                                    type="button"
                                    onClick={handleAddQuestion}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                                >
                                    Add Question
                                </button>
                            ) : (
                                <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
                                    Submit
                                </button>
                            )}
                        </div>
                    )}

                    {formData.assessmentType === "code" && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Coding Challenge</h3>
                                                <textarea
                        name="task"
                        placeholder="Task Description"
                        value={formData.codeChallenge.task}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        ></textarea>
                        <textarea
                        name="example"
                        placeholder="Example"
                        value={formData.codeChallenge.example}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        ></textarea>
                        <input
                        type="text"
                        name="inputFormat"
                        placeholder="Input Format"
                        value={formData.codeChallenge.inputFormat}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        />
                        <input
                        type="text"
                        name="outputFormat"
                        placeholder="Output Format"
                        value={formData.codeChallenge.outputFormat}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        />
                        <input
                        type="text"
                        name="constraints"
                        placeholder="Constraints (Optional)"
                        value={formData.codeChallenge.constraints}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        />
                        <input
                        type="text"
                        name="sampleInput_1"
                        placeholder="Sample Input_1"
                        value={formData.codeChallenge.sampleInput_1}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        />
                        <input
                        type="text"
                        name="sampleInput_2"
                        placeholder="Sample Input_2"
                        value={formData.codeChallenge.sampleInput_2}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        />
                        <input
                        type="text"
                        name="sampleInput_3"
                        placeholder="Sample Input_3"
                        value={formData.codeChallenge.sampleInput_3}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        />
                        <input
                        type="text"
                        name="sampleInput_4"
                        placeholder="Sample Input_4"
                        value={formData.codeChallenge.sampleInput_4}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        />
                        <input
                        type="text"
                        name="sample_output_1"
                        placeholder="Sample Output_1"
                        value={formData.codeChallenge.sample_output_1}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        />
                        <input
                        type="text"
                        name="sample_output_2"
                        placeholder="Sample Output_2"
                        value={formData.codeChallenge.sample_output_2}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        />
                        <input
                        type="text"
                        name="sample_output_3"
                        placeholder="Sample Output_3"
                        value={formData.codeChallenge.sample_output_3}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        />
                        <input
                        type="text"
                        name="sample_output_4"
                        placeholder="Sample Output_4"
                        value={formData.codeChallenge.sample_output_4}
                        onChange={handleCodeChange}
                        className="border p-2 rounded-lg w-full"
                        required
                        />
                        </div>
                    )}

                    <div className="flex items-center space-x-2 mt-4">
                        <input
                            type="checkbox"
                            id="publish"
                            name="publish"
                            checked={formData.publish}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="publish" className="text-sm font-medium text-gray-900">
                            Publish Assessment
                        </label>
                    </div>

                    <div className="flex justify-end space-x-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AssessmentForm;