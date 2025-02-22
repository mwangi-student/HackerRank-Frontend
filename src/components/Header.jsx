import React from "react";
import Banner from "./Banner";

const Header = () => {
  return (
    <div className="header-container h-[250px] w-full items-center bg-gradient-to-b from-[rgba(178,248,253,0.8)] to-[rgba(221,221,221,0)]">
      <div className="header-breadcrumbs">
        <ul className="breadcrumbs">
          <li className="breadcrumb-item font-bold text-gray-500 font-sans">
            All Contests
          </li>
        </ul>
        <h2 className="text-3xl text-semibold text-[#003066]">Contests</h2>
        <hr className="w-32 border-gray-400 border-2 my-2" />
      </div>
      <Banner />
    </div>
  );
};

export default Header;
