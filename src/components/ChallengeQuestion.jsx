import React from "react";

export default function ChallengeQuestion() {
  return (
    <div className="font-[Satoshi] w-full min-h-[500px] bg-[#E4F2FF] pl-6 pr-[75px] py-8 rounded-lg">
      <h5 className="font-bold text-2xl mb-2">The Hashtag Generator</h5>
      <h5 className="font-bold text-lg mb-4 mt-6">Task</h5>
      <p className="text-base leading-[1.8] mb-8">
        You are given a string s that consists of English letters and brackets.
        It is guaranteed that the brackets in s form a regular bracket sequence.
        Your task is to reverse the strings in each pair of matching brackets,
        starting from the innermost one step by step (remove the brackets at the
        same time).
      </p>
      <h5 className="font-bold text-lg mb-4">Example</h5>
      <ul className="list-inside list-disc mb-8">
        <li>For s = "a(bc)de" the output should be "acbde".</li>
        <li>
          For s = "a(bcdefghijkl(mno)p)q" the output should be
          "apmnolkjihgfedcbq".
        </li>
      </ul>
      <h5 className="font-bold text-lg mb-4">Input Format</h5>
      <p className="text-base leading-[1.8] mb-1">
        A string consisting of English letters, punctuation marks, whitespace
        characters, and brackets. It is guaranteed that parentheses form a
        regular bracket sequence.
      </p>
      <p className="font-medium mb-8">[input] string s</p>
      <h5 className="font-bold text-lg mb-4">Output Format</h5>
      <p className="font-medium mb-8">[output] a string</p>
      <h5 className="font-bold text-lg mb-4">Sample Input</h5>
      <p className="w-full bg-[#f7f8fd] py-4 px-4 rounded-lg mb-8">
        Code(Cha(lle)nge)
      </p>
      <h5 className="font-bold text-lg mb-4">Sample Output</h5>
      <p className="w-full bg-[#f7f8fd] py-4 px-4 rounded-lg mb-8">
        CodeegnlleahC
      </p>
    </div>
  );
}
