import React from "react";

export default function ChallengeQuestion({ challenge, assessment }) {
  if (!challenge) {
    return (
      <div className="font-[Satoshi] w-full min-h-[500px] bg-[#E4F2FF] pl-6 pr-[75px] py-8 rounded-lg">
        <h5 className="font-bold text-2xl mb-2 text-red-500">Challenge not found</h5>
      </div>
    );
  }

  return (
    <div className="font-[Satoshi] w-full min-h-[500px] bg-[#E4F2FF] pl-6 pr-[75px] py-8 rounded-lg">
      <h5 className="font-bold text-2xl mb-2">{assessment.title}</h5>
      <h5 className="font-bold text-lg mb-4 mt-6">Task</h5>
      <p className="text-base leading-[1.8] mb-8">
        {assessment.task}
      </p>
      <h5 className="font-bold text-lg mb-4">Example</h5>
      <p className="text-base leading-[1.8] mb-8">{challenge.example}</p>
      <h5 className="font-bold text-lg mb-4">Input Format</h5>
      <p className="text-base leading-[1.8] mb-1">
        {challenge.input_format}
      </p>
      <p className="font-medium mb-8">[input] string s</p>
      <h5 className="font-bold text-lg mb-4">Output Format</h5>
      <p className="font-medium mb-8">{challenge.output_format}</p>
      <h5 className="font-bold text-lg mb-4">Sample Input</h5>
      <p className="w-full bg-[#f7f8fd] py-4 px-4 rounded-lg mb-8">
        {challenge.sample_input_1}
      </p>
      <h5 className="font-bold text-lg mb-4">Sample Output</h5>
      <p className="w-full bg-[#f7f8fd] py-4 px-4 rounded-lg mb-8">
        {challenge.sample_output_1}
      </p>
    </div>
  );
}
