import React, { useState, useEffect } from "react";

export default function CreateAssessmentForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isUpdateMode
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    category: "",
    constraints: "",
    publish: false,
    inviteStudents: false
  });

  // Populate form when in update mode
  useEffect(() => {
    if (isUpdateMode && initialData) {
      setFormData(initialData);
    }
  }, [isUpdateMode, initialData]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null; // Hide modal when not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isUpdateMode ? "Update Assessment" : "Create Assessment"}
        </h2>

        {/* Form */}
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

          <textarea
            name="constraints"
            placeholder="Constraints (optional)"
            value={formData.constraints}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          ></textarea>

          {/* Buttons */}
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
              {isUpdateMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
