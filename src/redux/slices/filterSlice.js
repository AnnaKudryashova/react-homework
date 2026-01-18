import { createSlice } from '@reduxjs/toolkit';

const INITIAL_MEALS_COUNT = 6;

const initialState = {
    selectedCategory: null,
    mealsToShowByCategory: {},
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            const newCategory = action.payload;

            if (state.selectedCategory === newCategory) {
                state.selectedCategory = null;
                return;
            }

            state.selectedCategory = newCategory;

            if (!state.mealsToShowByCategory[newCategory]) {
                state.mealsToShowByCategory[newCategory] = INITIAL_MEALS_COUNT;
            }
        },

        clearCategory: (state) => {
            state.selectedCategory = null;
        },

        loadMoreMeals: (state, action) => {
            const category = state.selectedCategory;
            if (!category) return;

            const increment = action.payload ?? INITIAL_MEALS_COUNT;

            state.mealsToShowByCategory[category] =
                (state.mealsToShowByCategory[category] || INITIAL_MEALS_COUNT) +
                increment;
        },
    },
});

export const { setCategory, clearCategory, loadMoreMeals } =
    filterSlice.actions;
export default filterSlice.reducer;
