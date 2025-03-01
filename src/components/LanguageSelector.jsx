import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "text-blue-400";

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-2 mb-4">
      <p className="mb-2 text-lg text-white">Language:</p>
      <div className="relative">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {language}
        </button>
        {isOpen && (
          <ul className="absolute left-0 mt-2 w-48 bg-gray-900 text-white rounded-md shadow-lg overflow-hidden z-10">
            {languages.map(([lang, version]) => (
              <li
                key={lang}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-800 ${lang === language ? "bg-gray-900" : ""}`}
                onClick={() => {
                  onSelect(lang);
                  setIsOpen(false);
                }}
              >
                <span className={lang === language ? ACTIVE_COLOR : ""}>{lang}</span>
                <span className="text-gray-500 text-sm"> ({version})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
