import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    isRegistering: false,
    error: '',
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },
        setPassword(state, action) {
            state.password = action.payload;
        },
        toggleIsRegistering(state) {
            state.isRegistering = !state.isRegistering;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearForm(state) {
            state.email = '';
            state.password = '';
            state.error = '';
        },
    },
});

export const {
    setEmail,
    setPassword,
    toggleIsRegistering,
    setError,
    clearForm,
} = loginSlice.actions;

export default loginSlice.reducer;
