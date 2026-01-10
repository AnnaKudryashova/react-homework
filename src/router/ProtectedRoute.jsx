import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const RedirectToLogin = () => <Navigate to="/login" replace />;

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <RedirectToLogin />;
    }

    return children;
};

export default ProtectedRoute;
