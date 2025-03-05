import React from "react";
import { scores } from "../data/grade";

export default function GradeSection() {
  return (
    <div className="w-[500px] p-6">
      <h3 className="text-2xl text-semibold">Assessment performance</h3>
      <p className="font-medium text-lg">
        Performance of assessment in grades.
      </p>
      <div className="grid grid-cols">
        <div className="flex flex-row justify-between">
          <span className="font-medium text-md">Grade</span>
          <span className="font-medium text-md">No of students</span>
          <div className="mb-2">
            <div>
              <span>100-70</span>
              <span className="font-medium text-green-600">A</span>
            </div>
            <span>2</span>
          </div>
          <div className="mb-2">
            <div>
              <span>69-60</span>
              <span className="font-medium text-lime-600">B</span>
            </div>
            <span>4</span>
          </div>
          <div className="mb-2">
            <div>
              <span>59-50</span>
              <span className="font-medium text-yellow-600">C</span>
            </div>
            <span>3</span>
          </div>
          <div className="mb-2">
            <div>
              <span>49-40</span>
              <span className="font-medium text-amber-600">D</span>
            </div>
            <span>1</span>
          </div>
          <div className="mb-2">
            <div>
              <span>39-0</span>
              <span className="font-medium text-red-600">E</span>
            </div>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
