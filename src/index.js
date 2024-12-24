import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you have the correct import for React 18+
import TodoApp from "./App";
import "./index.css";

// Get the root element from the HTML
const rootElement = document.getElementById("root");

// Check if the root element exists
if (!rootElement) {
  console.error("No root element found in the HTML. Make sure your HTML file contains a <div id='root'></div>.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <TodoApp />
    </React.StrictMode>
  );
}
