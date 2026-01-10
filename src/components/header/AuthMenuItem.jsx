import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import headerStyles from './Header.module.css';
import styles from './AuthMenuItem.module.css';

export const AuthMenuItem = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
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
