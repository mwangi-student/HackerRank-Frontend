import React from "react";
import {
  TmNavbar,
  PublishedAssessments,
  UnpublishedAssessments,
} from "../components";

export default function AdminAssessment() {
  return (
    <div className="bg-[#ededed] font-[Montserrat] flex flex-col min-h-screen w-full">
      <div className="fixed top-0 w-full z-[100]">
        <TmNavbar />
      </div>
      <main className="flex-grow">
        <div className="h-[250px] w-full items-center gap-5 py-[5%] pl-[10%] pr-[17%] flex-wrap bg-gradient-to-b from-[rgba(170, 255, 174, 0.8)] to-[rgba(237,237,237,0)]">
          <div className="flex flex-row gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              id="Paper-Write--Streamline-Ultimate"
              height="24"
              width="24"
            >
              <desc>Paper Write Streamline Icon: https://streamlinehq.com</desc>
              <path
                stroke="#014c06"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m13.05 19.14 -3.71998 0.53 0.53 -3.67L19.41 6.45995c0.4265 -0.39744 0.9907 -0.61381 1.5736 -0.60352 0.5829 0.01028 1.139 0.24642 1.5513 0.65866 0.4122 0.41224 0.6484 0.96839 0.6586 1.5513 0.0103 0.5829 -0.206 1.14704 -0.6035 1.57357L13.05 19.14Z"
                stroke-width="1.5"
              ></path>
              <path
                stroke="#014c06"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.5 0.75h7s0.75 0 0.75 0.75V4s0 0.75 -0.75 0.75h-7s-0.75 0 -0.75 -0.75V1.5s0 -0.75 0.75 -0.75Z"
                stroke-width="1.5"
              ></path>
              <path
                stroke="#014c06"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.25 2.75h2.5c0.3978 0 0.7794 0.15804 1.0607 0.43934s0.4393 0.66284 0.4393 1.06066"
                stroke-width="1.5"
              ></path>
              <path
                stroke="#014c06"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 18.75v3c0 0.3978 -0.158 0.7794 -0.4393 1.0607s-0.6629 0.4393 -1.0607 0.4393H2.25c-0.39782 0 -0.77936 -0.158 -1.06066 -0.4393C0.908035 22.5294 0.75 22.1478 0.75 21.75V4.25c0 -0.39782 0.158035 -0.77936 0.43934 -1.06066 0.2813 -0.2813 0.66284 -0.43934 1.06066 -0.43934h2.5"
                stroke-width="1.5"
              ></path>
              <path
                stroke="#014c06"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.25 8.75h7"
                stroke-width="1.5"
              ></path>
              <path
                stroke="#014c06"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.25 13.25h2.5"
                stroke-width="1.5"
              ></path>
            </svg>
            <h2 className="text-3xl text-bold text-[#014C06]">Assessments</h2>
          </div>
          <hr className="w-38 border-gray-400 border-2 my-2" />
          <p className="font-medium text-lg text-[#014C06]">
            Create, review, publish and view student's assessments.
          </p>
        </div>
        <div className="min-h-[200px] w-full items-center gap-5 py-[1.5%] pl-[10%] pr-[17%] flex-wrap">
          <PublishedAssessments />
        </div>
        <div className="min-h-[200px] w-full items-center gap-5 py-[1.5%] pl-[10%] pr-[17%] flex-wrap">
          <UnpublishedAssessments />
        </div>
        <div className="min-h-[200px] w-full items-center gap-5 py-[1.5%] pl-[10%] pr-[17%] flex-wrap">
          <p className="font-medium text-lg text-[#014C06]">
            Create an Assessment.
          </p>
          <hr className="w-32 border-gray-400 border-2 my-2" />
          <button className="px-3 py-2 rounded-lg text-white bg-[#13813A] hover:bg-[#527254] transition duration-250">
            Create
          </button>
        </div>
      </main>
    </div>
  );
}
