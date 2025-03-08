import React, { useState, useContext } from "react";
import  FeedbackContext  from "../Contexts/FeedbackContext"; // Import the FeedbackContext hook

export default function CreateFeedback() {
  const [feedbackText, setFeedbackText] = useState("");
  const [message, setMessage] = useState(null);
  const { submitFeedback, loading } = useContext(FeedbackContext); // Get function from context

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      setMessage({ success: false, message: "Feedback cannot be empty" });
      return;
    }

    const result = await submitFeedback({ feedback: feedbackText });
    setMessage(result);
    if (result.success) setFeedbackText(""); // Clear input on success
  };

  return (
    <div className="mt-6">
      <h5 className="font-bold text-lg mb-2">Leave Feedback/Comment</h5>
      <textarea
        className="w-[500px] min-h-[100px] p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#014C06]"
        placeholder="Enter feedback (optional)"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
      
      {message && (
        <p className={`mt-2 text-sm ${message.success ? "text-green-600" : "text-red-600"}`}>
          {message.message}
        </p>
      )}
    </div>
  );
}
