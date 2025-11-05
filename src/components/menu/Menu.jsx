import { useState, useMemo } from 'react';
import styles from './Menu.module.css';
import Button from '../button/Button.jsx';
import CardList from '../cardList/CardList.jsx';
import Tooltip from '../tooltip/Tooltip.jsx';
import useFetch from '../../hooks/useFetch.js';
import { API_BASE_URL } from '../../services/api.js';

const INITIAL_MEALS_COUNT = 6;
const MEALS_PER_LOAD = 6;

const Menu = () => {
    const [mealsToShow, setMealsToShow] = useState(INITIAL_MEALS_COUNT);

    const { data: meals, error, isLoading } = useFetch(`${API_BASE_URL}/meals`);

    const categories = useMemo(
        () => (meals ? [...new Set(meals.map((meal) => meal.category))] : []),
        [meals]
    );

    if (error) {
        return <p>Menu loading error: {error.message}</p>;
    }

    const visibleMeals = meals ? meals.slice(0, mealsToShow) : [];

    const handleLoadMore = () => {
        setMealsToShow((prevCount) => prevCount + MEALS_PER_LOAD);
    };

    return (
        <section className={styles.menuSection}>
            <h1 className={styles.title}>Browse our menu</h1>
            <p className={styles.description}>
                <span>Use our menu to place an order online, or</span>
                <Tooltip text="+370 44-777-777">
                    <span className={styles.phoneTooltip}>phone</span>
                </Tooltip>
                our store <br /> to place a pickup order. Fast and fresh food.
            </p>
            <div className={styles.buttonRow}>
                {categories.map((category, index) => (
                    <Button key={category} isActive={index === 0}>
                        {category}
                    </Button>
                ))}
            </div>

            {isLoading ? (
                <p>Menu loading in progress...</p>
            ) : visibleMeals.length > 0 ? (
                <>
                    <CardList cards={visibleMeals} />
                    {visibleMeals.length < meals.length && (
                        <Button onClick={handleLoadMore}>See more</Button>
                    )}
                </>
            ) : (
                <p className={styles.noMenuItems}>
                    Nothing on the menu right now - check back later!
                </p>
            )}
        </section>
    );
};

export default Menu;
