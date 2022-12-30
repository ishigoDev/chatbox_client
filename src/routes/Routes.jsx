import {createBrowserRouter} from "react-router-dom";
import {HomePage,LoginPage,ChatPage} from './Pages';


export const routers = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path:'/login',
      element:<LoginPage/>
    },
    {
      path:'/chatroom',
      element:<ChatPage />
    }
  ]); 