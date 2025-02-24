import React from "react";
import {
  Navbar,
  ChallengesList,
  SortChallenge,
  Footer,
} from "../components/index";
import { useParams } from "react-router-dom";

export default function Challenges() {
  const { language } = useParams();

  return (
    <div className="font-[Montserrat] bg-[#F3F5FF] flex flex-col min-h-screen w-full">
      <div className="fixed top-0 w-full z-[100]">
        <Navbar />
      </div>
      <main className="flex-grow">
        <div className="py-[3%] pl-[10%] pr-[10%]">
          <ChallengesList language={language} />
        </div>
        <div>
          <SortChallenge />
        </div>
      </main>
      <Footer />
    </div>
  );
}
