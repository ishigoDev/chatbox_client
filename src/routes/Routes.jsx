import {createBrowserRouter} from "react-router-dom";
import {HomePage,LoginPage} from './Pages';


export const routers = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path:'/login',
      element:<LoginPage/>
    }
  ]); 