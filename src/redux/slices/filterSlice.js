import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCategory: null,
    mealsToShow: 6,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            const newCategory = action.payload;
            if (state.selectedCategory === newCategory) {
                state.selectedCategory = null;
            } else {
                state.selectedCategory = newCategory;
            }
            state.mealsToShow = 6;
        },
        clearCategory: (state) => {
            state.selectedCategory = null;
            state.mealsToShow = 6;
        },
        setMealsToShow: (state, action) => {
            state.mealsToShow = action.payload;
        },
        loadMoreMeals: (state, action) => {
            state.mealsToShow += action.payload || 6;
        },
    },
});

export const { setCategory, clearCategory, setMealsToShow, loadMoreMeals } =
    filterSlice.actions;

export default filterSlice.reducer;
