import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/localStorage';

const PrivateRoute = ({children}) => {
  return getToken () ? children : <Navigate to="/login" replace />
}
export default PrivateRoute
