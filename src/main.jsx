import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import App from "./App.jsx";
import "./index.css";
import "aos/dist/aos.css";
import "./i18n";
import AuthContextProvider from "./Context/AuthContext.jsx";
import HerbasContextProvider from "./Context/HerbasContext.jsx";

createRoot(document.getElementById("root")).render(
  <HeroUIProvider>
    <AuthContextProvider>
      <HerbasContextProvider>
        <App />
      </HerbasContextProvider>
    </AuthContextProvider>
  </HeroUIProvider>,
);
