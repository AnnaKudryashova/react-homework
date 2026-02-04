import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../redux/store';
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';

const RedirectToLogin = () => <Navigate to="/login" replace />;

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useSelector((state: RootState) => state.auth);
    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <RedirectToLogin />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
