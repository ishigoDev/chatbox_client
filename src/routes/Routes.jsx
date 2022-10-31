import {createBrowserRouter} from "react-router-dom";
import {HomePage} from './Pages';

export const routers = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
  ]); 