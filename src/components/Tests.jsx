import React from "react";
import { TestLanguages } from "../data/test-languages-data";
import { useNavigate } from "react-router-dom";

export default function Tests() {
  const navigate = useNavigate();

  return (
    <div className="gap-5">
      <h3 className="text-2xl text-semibold">Practice</h3>
      <p className="font-medium text-lg">Practice various languaages</p>
      <div className="w-[1000px] h-auto grid grid-cols-3 gap-2 my-10">
        {TestLanguages.map((test) => (
          <div
            key={test.index}
            className="flex gap-4 w-[300px] items-center bg-white hover:bg-[#ebebf3] hover:cursor-pointer py-3.5 px-4 mb-4 rounded-lg"
            onClick={() => {
              navigate(`/practice/${test.language}`);
            }}
          >
            <div>{test.icon}</div>
            <p className="font-bold text-[#003066]">{test.language}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
