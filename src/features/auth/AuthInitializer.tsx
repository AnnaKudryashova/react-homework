import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { initAuthListener } from '../../redux/slices/authSlice';

const AuthInitializer = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = dispatch(initAuthListener());
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [dispatch]);

    return null;
};

export default AuthInitializer;
