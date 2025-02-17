import React from "react";
import Banner from "./Banner";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-breadcrumbs">
        <ul className="breadcrumbs">
          <li className="breadcrumb-item">Dashboard</li>
          <li className="breadcrumb-item">
            <img src="/Item-arrow-right.svg" alt="arrow-right" />
          </li>
          <li className="breadcrumb-item">Certification Tests</li>
        </ul>
        <h2>Get Certified</h2>
      </div>
      <Banner />
    </div>
  );
};

export default Header;
