import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RadiantLanding from "./RadiantLanding";
import RadiantPrivacyPage from "./RadiantPrivacyPage";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <RadiantLanding /> },
  { path: "/privacy", element: <RadiantPrivacyPage /> },
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);