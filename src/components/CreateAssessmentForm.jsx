import React, { useState, useEffect, useContext } from "react";
import AssessmentContext from "../Contexts/AssessmentContext";
import UserContext from "../Contexts/UserContext"; // Import UserContext

export default function CreateAssessmentForm({
  isOpen,
  onClose,
  isUpdateMode,
  initialData,
}) {

  const { fetchCurrentUser } = useContext(UserContext); // Use fetchCurrentUser instead of user
  const { createAssessment: createAssessmentFromContext, setAssessments } = useContext(AssessmentContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    category: "",
    assessment_type: "",
    constraints: "",
    time_limit: "",
    publish: false,
    invite_students: [],
  });

  useEffect(() => {
    if (isUpdateMode && initialData) {
      setFormData({
        ...initialData,
        invite_students: initialData.invite_students || [],
      });
    }
  }, [isUpdateMode, initialData]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInviteChange = (e) => {
    const value = e.target.value.split(",").map((email) => email.trim());
    setFormData((prev) => ({
      ...prev,
      invite_students: value,
    }));
  };

  const createAssessment = async (data) => {
    console.log("Fetching current user...");
    
    const userData = await fetchCurrentUser();
    console.log("Fetched user data:", userData);
  
    if (!userData?.id) {
      return { success: false, message: "Missing required user ID" };
    }
  
    const authToken = localStorage.getItem("authToken");
    console.log("Auth Token:", authToken);
  
    if (!authToken) {
      return { success: false, message: "Authentication token missing" };
    }
  
    const requestData = {
      ...data,
      tm_id: userData.id,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/assessment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create assessment:", errorData);
        return { success: false, message: errorData.error || "Failed to create assessment" };
      }
  
      const responseData = await response.json();
      
      // Update state using setAssessments from context
      setAssessments((prev) => [...prev, { ...requestData, id: responseData.id }]);
  
      return { success: true, message: "Assessment created successfully" };
    } catch (error) {
      console.error("Error submitting assessment:", error);
      return { success: false, message: "Failed to create assessment" };
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.difficulty || !formData.category || !formData.assessment_type || !formData.constraints || !formData.time_limit) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Fetching user before assessment submission...");
    const assessmentResponse = await createAssessmentFromContext(formData);


    if (!assessmentResponse.success) {
      alert(assessmentResponse.message);
      return;
    }

    alert("Assessment created successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isUpdateMode ? "Update Assessment" : "Create Assessment"}
        </h2>
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
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          ></textarea>
          <input
            type="text"
            name="difficulty"
            placeholder="Difficulty (e.g., Easy, Medium, Hard)"
            value={formData.difficulty}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., JavaScript, Python)"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="assessment_type"
            placeholder="Assessment Type"
            value={formData.assessment_type}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
          <textarea
            name="constraints"
            placeholder="Constraints (e.g., no external libraries, time-bound)"
            value={formData.constraints}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          ></textarea>
          <input
            type="number"
            name="time_limit"
            placeholder="Time Limit (in minutes)"
            value={formData.time_limit}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="invite_students"
            placeholder="Invite Students (comma-separated emails)"
            value={formData.invite_students.join(", ")}
            onChange={handleInviteChange}
            className="border p-2 rounded-lg w-full"
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              {isUpdateMode ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
