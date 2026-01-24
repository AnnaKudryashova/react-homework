import { useTranslation } from 'react-i18next';
import styles from './LanguageDropdown.module.css';

const languageOptions = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'fr', label: 'FR' },
    { code: 'lt', label: 'LT' },
] as const;

export const LanguageDropdown = () => {
    const { i18n } = useTranslation();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = event.target.value;
        void i18n.changeLanguage(newLang);
    };

    return (
        <label className={styles.wrapper}>
            <select
                value={i18n.language}
                onChange={handleChange}
                className={styles.select}
                aria-label="Select language"
            >
                {languageOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};
