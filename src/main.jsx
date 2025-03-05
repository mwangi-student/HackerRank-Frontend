import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./Contexts/UserContext.jsx";
import App from "./App.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </UserProvider>
  
);
