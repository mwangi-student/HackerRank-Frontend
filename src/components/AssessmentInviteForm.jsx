import React, { useState } from "react";

export default function AssessmentInviteForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    assessment_id: "",
    selectedStudents: []
  });

  const students = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" }
  ];

  const allSelected = formData.selectedStudents.length === students.length;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStudentSelection = (studentId) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedStudents.includes(studentId);
      return {
        ...prev,
        selectedStudents: alreadySelected
          ? prev.selectedStudents.filter((id) => id !== studentId)
          : [...prev.selectedStudents, studentId]
      };
    });
  };

  const handleSelectAll = () => {
    setFormData((prev) => ({
      ...prev,
      selectedStudents: allSelected ? [] : students.map((s) => s.id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Invite Students
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Assessment ID Input */}
          <input
            type="text"
            name="assessment_id"
            placeholder="Assessment ID"
            value={formData.assessment_id}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />

          {/* Student Selection List */}
          <div className="border p-2 rounded-lg w-full max-h-40 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Select Students:</h3>
            <label className="flex items-center space-x-2 mb-2 font-semibold">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="w-4 h-4"
              />
              <span>Select All</span>
            </label>
            {students.map((student) => (
              <label
                key={student.id}
                className="flex items-center space-x-2 mb-2"
              >
                <input
                  type="checkbox"
                  value={student.id}
                  checked={formData.selectedStudents.includes(student.id)}
                  onChange={() => handleStudentSelection(student.id)}
                  className="w-4 h-4"
                />
                <span>{student.name}</span>
              </label>
            ))}
          </div>

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
              Send Invites
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
