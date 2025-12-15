import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import headerStyles from './Header.module.css';
import styles from './AuthMenuItem.module.css';

export const AuthMenuItem = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const handleLogout = async () => {
        await dispatch(logout());
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
