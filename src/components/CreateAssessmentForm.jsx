import React, { useState, useEffect, useContext } from "react";
import AssessmentContext from "../Contexts/AssessmentContext";
import UserContext from "../Contexts/UserContext"; // Import UserContext

export default function CreateAssessmentForm({
  isOpen,
  onClose,
  isUpdateMode,
  initialData,
}) {
  const { fetchCurrentUser } = useContext(UserContext);
  const { createAssessment: createAssessmentFromContext, setAssessments } = useContext(AssessmentContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    category: "",
    assessment_type: "",
    constraints: "",
    time_limit: "",
    publish: false, // Default set to false
  });

  useEffect(() => {
    if (isUpdateMode && initialData) {
      setFormData({
        ...initialData,
        publish: false, // Ensure publish is always false
      });
    }
  }, [isUpdateMode, initialData]);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.difficulty || !formData.category || !formData.assessment_type || !formData.constraints || !formData.time_limit) {
      alert("Please fill out all required fields.");
      return;
    }

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

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              {isUpdateMode ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}