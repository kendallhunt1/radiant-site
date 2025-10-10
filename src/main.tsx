// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RadiantLanding from "./RadiantLanding";
// import RadiantPrivacyPage from "./RadiantPrivacyPage";
// import "./index.css";

// const router = createBrowserRouter([
//   { path: "/", element: <RadiantLanding /> },
//   { path: "/privacy", element: <RadiantPrivacyPage /> },
// ]);

// createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);

// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import RadiantLanding from "./RadiantLanding";
import RadiantPrivacyPage from "./RadiantPrivacyPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<RadiantLanding />} />
        <Route path="/privacy" element={<RadiantPrivacyPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

