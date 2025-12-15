import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../services/api.js';

export const fetchMeals = createAsyncThunk(
    'meals/fetchMeals',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/meals`);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
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
            .addCase(fetchMeals.fulfilled, (state, action) => {
                state.loading = false;
                state.meals = action.payload;
                state.error = null;
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default mealsSlice.reducer;

