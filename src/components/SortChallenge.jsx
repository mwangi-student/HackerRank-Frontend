import React from "react";

export default function SortChallenge() {
  return (
    <div>
      <div>
        <hr className="w-32 border-gray-400 border-2 my-2" />
        <h6 className="text-gray-500 font-medium">STATUS</h6>
        <label>
          <input className="accent-blue-500" type="checkbox" checked />
          Solved
        </label>
        <label>
          <input className="accent-blue-500" type="checkbox" checked />
          Unsolved
        </label>
      </div>
      <div>
        <hr className="w-32 border-gray-400 border-2 my-2" />
        <h6 className="text-gray-500 font-medium">DIFFICULTY</h6>
        <label>
          <input className="accent-blue-500" type="checkbox" checked />
          Easy
        </label>
        <label>
          <input className="accent-blue-500" type="checkbox" checked />
          Medium
        </label>
        <label>
          <input className="accent-blue-500" type="checkbox" checked />
          Hard
        </label>
      </div>
    </div>
  );
}
