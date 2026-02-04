import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import headerStyles from './Header.module.css';
import styles from './AuthMenuItem.module.css';
import { logoutUser } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';

export const AuthMenuItem = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

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
                    {t('nav.login')}
                </NavLink>
            </li>
        );
    }

    return (
        <li className={headerStyles.menuItem}>
            <Button
                type="button"
                onClick={handleLogout}
                className={styles.logoutButton}
                variant="secondary"
            >
                {t('nav.logout')}
            </Button>
        </li>
    );
};
