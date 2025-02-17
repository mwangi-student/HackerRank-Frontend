import React from "react";

const footerItems = [
  "Blog",
  "Scoring",
  "Environment",
  "FAQ",
  "About Us",
  "Support",
  "Careers",
  "Terms of Service",
  "Privacy Policy",
];

const Footer = () => {
  return (
    <footer>
      <ul className="footer-items">
        {footerItems.map((item, index) => {
          return (
            <li key={index} className="footer-item">
              <a href="">{item}</a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
