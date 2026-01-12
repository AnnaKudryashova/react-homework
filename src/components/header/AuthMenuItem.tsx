import { NavLink, useNavigate } from 'react-router-dom';
import headerStyles from './Header.module.css';
import styles from './AuthMenuItem.module.css';
import { logoutUser } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const AuthMenuItem = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/', { replace: true });
    };

    if (!user) {
        return (
            <li className={headerStyles.menuItem}>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `${headerStyles.menuLink} ${
                            isActive ? headerStyles.active : ''
                        }`
                    }
                >
                    Login
                </NavLink>
            </li>
        );
    }

    return (
        <li className={headerStyles.menuItem}>
            <button
                type="button"
                onClick={handleLogout}
                className={styles.logoutButton}
            >
                Logout
            </button>
        </li>
    );
};
