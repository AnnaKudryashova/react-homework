import { useTheme } from '../../contexts/ThemeContext';
import { GoSun, GoMoon } from 'react-icons/go';
import Button from '../button/Button';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <Button
            type="button"
            onClick={toggleTheme}
            className={styles.toggleButton}
            aria-label={
                isDark ? 'Switch to light theme' : 'Switch to dark theme'
            }
            variant="secondary"
        >
            {isDark ? (
                <GoSun className={styles.icon} strokeWidth={1} />
            ) : (
                <GoMoon className={styles.icon} strokeWidth={1} />
            )}
        </Button>
    );
};
