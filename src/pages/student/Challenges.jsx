import React from "react";
import {
  Navbar,
  ChallengesList,
  SortChallenge,
  Footer,
} from "../../components/index";
import { useParams, Link } from "react-router-dom";

export default function Challenges() {
  const { language } = useParams();

  return (
    <div className="font-[Montserrat] bg-[#F3F5FF] flex flex-col min-h-screen w-full">
      <div className="fixed top-0 w-full z-[100]">
        <Navbar />
      </div>
      <main className="flex-grow mt-20">
        <div className="bg-white w-[full] py-8 pl-[100px]">
          <div className="flex flex-row">
            <Link to="/prepare" className="text-2xl font-medium">
              Prepare
            </Link>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="Angle-Right-B--Streamline-Unicons"
              height="30"
              width="30"
            >
              <desc>
                Angle Right B Streamline Icon: https://streamlinehq.com
              </desc>
              <path
                d="M10.333333333333332 7.533333333333333 6.600006666666666 3.733366666666667c-0.26666666666666666 -0.26666666666666666 -0.6666666666666666 -0.26666666666666666 -0.9333333333333332 0 -0.26666666666666666 0.26666666666666666 -0.26666666666666666 0.6666666666666666 0 0.9333333333333332L8.933333333333334 7.933333333333334l-3.26666 3.2666666666666666c-0.13333333333333333 0.13333333333333333 -0.19999999999999998 0.26666666666666666 -0.19999999999999998 0.4666666666666666 0 0.39999999999999997 0.26666666666666666 0.6666666666666666 0.6666666666666666 0.6666666666666666 0.19999999999999998 0 0.3333333333333333 -0.06666666666666667 0.4666666666666666 -0.19999999999999998L10.399999999999999 8.333333333333332c0.19999999999999998 -0.13333333333333333 0.19999999999999998 -0.5333333333333333 -0.06666666666666667 -0.7999999999999999Z"
                fill="#000000"
                strokeWidth="0.6667"
              ></path>
            </svg>
            <Link to={`/prepare/${language}`} className="text-2xl font-medium">
              {language}
            </Link>
          </div>
        </div>
        <div className="flex-row">
          <div className="py-[3%] pl-[10%] pr-[10%]">
            <ChallengesList language={language} />
          </div>
          <div>
            <SortChallenge />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
