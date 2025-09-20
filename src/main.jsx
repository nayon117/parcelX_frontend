import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-montserrat max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
