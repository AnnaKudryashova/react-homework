import {
    createSlice,
    createAsyncThunk,
    SerializedError,
} from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
} from 'firebase/auth';
import { auth } from '../../firebase';

interface AuthUser {
    uid: string;
    email: string | null;
}

interface AuthState {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

const mapUser = (cred: UserCredential): AuthUser => ({
    uid: cred.user.uid,
    email: cred.user.email,
});

const mapError = (action: {
    payload?: unknown;
    error: SerializedError;
}): string =>
    (typeof action.payload === 'string'
        ? action.payload
        : action.error.message) || 'Unknown error';

export const registerUser = createAsyncThunk<
    AuthUser,
    { email: string; password: string },
    { rejectValue: string }
>('auth/registerUser', async ({ email, password }, { rejectWithValue }) => {
    try {
        const cred = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        return mapUser(cred);
    } catch (err: any) {
        return rejectWithValue(err.code || err.message || 'Auth error');
    }
});

export const loginUser = createAsyncThunk<
    AuthUser,
    { email: string; password: string },
    { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        return mapUser(cred);
    } catch (err: any) {
        return rejectWithValue(err.code || err.message || 'Auth error');
    }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
        } catch (err: any) {
            return rejectWithValue(err.code || err.message || 'Auth error');
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
                state.user = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = mapError(action);
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
