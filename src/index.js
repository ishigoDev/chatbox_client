import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {routers} from './routes/Routes'
import {RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={routers} />
  </React.StrictMode>
);

