import React from "react";

export default function CreateFeedback() {
  return (
    <div className="mt-6">
      <h5 className="font-bold text-lg mb-2">Leave Feedback/Comment</h5>
      <textarea
        className="w-[500px] min-h-[100px] p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#014C06]"
        placeholder="Enter feedback (optional)"
      />
    </div>
  );
}
