import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../services/api';
import type { MealItem } from '../../types/types';

interface MealsState {
    meals: MealItem[];
    loading: boolean;
    error: string | null;
}

export const fetchMeals = createAsyncThunk<
    MealItem[],
    void,
    { rejectValue: string }
>('meals/fetchMeals', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/meals`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data: MealItem[] = await response.json();
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to load meals');
    }
});

const initialState: MealsState = {
    meals: [],
    loading: false,
    error: null,
};

const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchMeals.fulfilled,
                (state, action: PayloadAction<MealItem[]>) => {
                    state.loading = false;
                    state.meals = action.payload;
                    state.error = null;
                },
            )
            .addCase(
                fetchMeals.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload ?? 'Failed to load meals';
                },
            );
    },
});

export default mealsSlice.reducer;
