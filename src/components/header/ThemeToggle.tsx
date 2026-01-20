import { useTheme } from '../../contexts/ThemeContext';
import { GoSun, GoMoon } from 'react-icons/go';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={styles.toggleButton}
            aria-label={
                isDark ? 'Switch to light theme' : 'Switch to dark theme'
            }
        >
            {isDark ? (
                <GoSun className={styles.icon} strokeWidth={1} />
            ) : (
                <GoMoon className={styles.icon} strokeWidth={1} />
            )}
        </button>
    );
};
