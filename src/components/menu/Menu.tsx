import { useEffect, useMemo } from 'react';
import styles from './Menu.module.css';
import Button from '../button/Button';
import CardList from '../cardList/CardList';
import Tooltip from '../tooltip/Tooltip';
import { fetchMeals } from '../../redux/slices/mealsSlice';
import { setCategory, loadMoreMeals } from '../../redux/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { MealItem } from '../../types/types';

const INITIAL_MEALS_COUNT = 6;

const Menu = () => {
    const dispatch = useAppDispatch();

    const {
        meals,
        loading: isLoading,
        error,
    } = useAppSelector((state) => state.meals);

    const { selectedCategory, mealsToShowByCategory } = useAppSelector(
        (state) => state.filter,
    );

    useEffect(() => {
        if (meals.length === 0) {
            dispatch(fetchMeals());
        }
    }, [dispatch, meals.length]);

    const categories = useMemo(
        () =>
            meals.length
                ? [
                      ...new Set(
                          meals
                              .map((meal: MealItem) => meal.category)
                              .filter(
                                  (category): category is string =>
                                      category !== undefined,
                              ),
                      ),
                  ]
                : [],
        [meals],
    );

    const filteredMeals = useMemo<MealItem[]>(() => {
        if (!meals.length) return [];
        if (!selectedCategory) return meals;
        return meals.filter((meal) => meal.category === selectedCategory);
    }, [meals, selectedCategory]);

    const mealsToShow =
        mealsToShowByCategory[selectedCategory as string] ??
        INITIAL_MEALS_COUNT;

    const visibleMeals = filteredMeals.slice(0, mealsToShow);

    if (error) {
        return <p>Menu loading error: {error}</p>;
    }

    const handleLoadMore = () => {
        dispatch(loadMoreMeals(INITIAL_MEALS_COUNT));
    };

    const handleCategoryChange = (category: string) => {
        dispatch(setCategory(category));
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
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        variant={
                            selectedCategory === category
                                ? 'primary'
                                : 'secondary'
                        }
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {isLoading ? (
                <p>Menu loading in progress...</p>
            ) : visibleMeals.length > 0 ? (
                <>
                    <CardList cards={visibleMeals} />
                    {visibleMeals.length < filteredMeals.length && (
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
