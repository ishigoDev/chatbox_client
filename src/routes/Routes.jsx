import {createBrowserRouter} from "react-router-dom";
import {Home} from './Pages';

export const routers = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
  ]); 