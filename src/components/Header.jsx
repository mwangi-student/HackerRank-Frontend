import React from "react";
import Banner from "./Banner";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-breadcrumbs">
        <ul className="breadcrumbs">
          <li className="breadcrumb-item font-bold text-gray-500 font-sans">
            All Contests
          </li>
        </ul>
        <h2 className="text-3xl text-bold ">Contests</h2>
        <hr className="w-32 border-gray-400 border-2 my-2" />
      </div>
      <Banner />
    </div>
  );
};

export default Header;
