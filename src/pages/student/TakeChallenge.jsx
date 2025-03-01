import React from "react";
import { ChallengeQuestion, CodeEditor, ChallengeHeader } from "../../components";

export default function TakeChallenge() {
  return (
    <div>
      <ChallengeHeader />
      <div className="flex flex-row h-screen pl-6 py-8 bg-[#000D1C] font-[Montserrat]">
        {/* Challenge Question Section (Fixed Width) */}
        <div className="w-[900px] overflow-auto pr-4">
          <ChallengeQuestion />
        </div>

        {/* Code Editor Section (Takes Remaining Space) */}
        <div className="flex-grow overflow-auto overflow-x-hidden">
          <div className="w-full">
            <CodeEditor />
          </div>
        </div>
      </div>
    </div>
  );
}
