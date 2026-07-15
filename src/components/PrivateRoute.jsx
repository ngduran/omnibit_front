import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  // Se estiver autenticado, mostra o conteúdo, senão manda para o login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}