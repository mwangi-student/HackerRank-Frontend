import React from "react";
import { Link } from "react-router-dom";

export default function ChallengeHeader() {
  return (
    <div className="font-[Satoshi]">
      <nav className="bg-[#192533] px-2 py-2">
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center space-x-4">
            <a className="flex items-center space-x-2 mr-6">
              <img
                src="/hackerrank-logo.svg"
                alt="hackerrank-logo"
                className="h-8"
              />
              <h4 className="text-white font-semibold text-lg">HackerRank</h4>
              <div className="text-gray-400">|</div>
            </a>

            <div className="flex flex-row text-white ml-6">
              <Link to="/prepare" className="text-lg font-medium hover:text-blue-400 mt-[10px] ">
                Prepare
              </Link>
              <div className="mt-[10px] mx-2">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Angle-Right-B--Streamline-Unicons"
                  height="30"
                  width="26"
                >
                  <desc>
                    Angle Right B Streamline Icon: https://streamlinehq.com
                  </desc>
                  <path
                    d="M10.333333333333332 7.533333333333333 6.600006666666666 3.733366666666667c-0.26666666666666666 -0.26666666666666666 -0.6666666666666666 -0.26666666666666666 -0.9333333333333332 0 -0.26666666666666666 0.26666666666666666 -0.26666666666666666 0.6666666666666666 0 0.9333333333333332L8.933333333333334 7.933333333333334l-3.26666 3.2666666666666666c-0.13333333333333333 0.13333333333333333 -0.19999999999999998 0.26666666666666666 -0.19999999999999998 0.4666666666666666 0 0.39999999999999997 0.26666666666666666 0.6666666666666666 0.6666666666666666 0.6666666666666666 0.19999999999999998 0 0.3333333333333333 -0.06666666666666667 0.4666666666666666 -0.19999999999999998L10.399999999999999 8.333333333333332c0.19999999999999998 -0.13333333333333333 0.19999999999999998 -0.5333333333333333 -0.06666666666666667 -0.7999999999999999Z"
                    fill="#ffffff"
                    strokeWidth="0.6667"
                  ></path>
                </svg>
              </div>
              <Link
                className="text-lg font-medium mt-[10px] text-slate-400"
              >
                Challenge
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
