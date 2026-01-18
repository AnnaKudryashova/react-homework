import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../../firebase';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const mapUser = (cred) => ({
    uid: cred.user.uid,
    email: cred.user.email,
});

const mapError = (action) =>
    action.payload ?? action.error?.message ?? 'Unknown error';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const cred = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            return mapUser(cred);
        } catch (err) {
            return rejectWithValue(err.code || err.message);
        }
    },
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const cred = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            return mapUser(cred);
        } catch (err) {
            return rejectWithValue(err.code || err.message);
        }
    },
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
        } catch (err) {
            return rejectWithValue(err.code || err.message);
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = mapError(action);
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = mapError(action);
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                Object.assign(state, initialState);
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = mapError(action);
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
