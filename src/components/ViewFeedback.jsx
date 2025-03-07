import React, { useContext } from "react";
import FeedbackContext from "../Contexts/FeedbackContext";

export default function ViewFeedback() {
  const { feedbacks } = useContext(FeedbackContext);

  return (
    <div className="mt-6">
      <h5 className="font-bold text-lg mb-2">Feedbacks</h5>
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div key={feedback.id} className="w-[500px] min-h-[100px] p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#014C06]">
            <p className="text-sm">{feedback.feedback}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No feedback available.</p>
      )}
    </div>
  );
}
