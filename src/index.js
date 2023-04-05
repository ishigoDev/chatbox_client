import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routes/Routes";
import { SocketIntialize, SocketContext } from "./utils/socket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SocketContext.Provider value={SocketIntialize}>
      <RouterProvider router={routers} />
    </SocketContext.Provider>
  </React.StrictMode>,
);
