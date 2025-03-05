import React from "react";
import { UserAssessmentList, TmNavbar, GradeSection } from "../../components";

export default function AssessmentsStatistics() {
  return (
    <div className="bg-[#ededed] font-[Montserrat] flex flex-col min-h-screen w-full">
      <div className="fixed top-0 w-full z-[100]">
        <TmNavbar />
      </div>
      <main className="flex-grow">
        <div className="h-[250px] w-full items-center gap-5 py-[5%] pl-[10%] pr-[17%] flex-wrap bg-gradient-to-b from-[rgba(193, 253, 178, 0.8)] to-[rgba(221,221,221,0)]">
          <h2 className="text-3xl text-bold text-[#014C06]">
            Assessment Statistics
          </h2>
          <hr className="w-32 border-gray-400 border-2 my-2" />
          <p className="font-medium text-lg text-[#014C06]">
            Prepare and practice programming skills
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <div className="min-h-[200px] w-[1200px] items-center gap-5 py-[1.5%] pl-[10%] pr-[17%] flex-wrap">
            <UserAssessmentList />
          </div>
          <div>
            <GradeSection />
          </div>
        </div>
      </main>
    </div>
  );
}
