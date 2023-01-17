import { createBrowserRouter } from 'react-router-dom'
import { HomePage, LoginPage, ChatPage } from './Pages'
import PrivateRoute from './PrivateRoute.jsx'

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/chatroom',
    element: (
      <PrivateRoute>
        <ChatPage />
      </PrivateRoute>
    ),
  },
])
