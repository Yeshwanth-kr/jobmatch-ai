import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { JobMatchProvider } from "./context/JobMatchContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { MenuProvider } from "./context/MenuContext.jsx";
import { TabProvider } from "./context/TabContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <TabProvider>
        <MenuProvider>
          <UserProvider>
            <AuthProvider>
              <JobMatchProvider>
                <Toaster />
                <App />
              </JobMatchProvider>
            </AuthProvider>
          </UserProvider>
        </MenuProvider>
      </TabProvider>
    </LoadingProvider>
  </React.StrictMode>
);
