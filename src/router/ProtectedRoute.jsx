import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectToLogin = () => <Navigate to="/login" replace />;

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    if (!user) {
        return <RedirectToLogin />;
    }
    return children;
};

export default ProtectedRoute;
