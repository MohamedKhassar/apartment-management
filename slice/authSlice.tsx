import { UserAdmin } from "@/lib/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState: { user: UserAdmin | null, isLoading: boolean, error: string | null } = {
    user: null,
    isLoading: false,
    error: null,
}

export const loginUser = createAsyncThunk(
    "users/login",
    async (payload: { name: string | null }, { rejectWithValue }) => {
        const { name } = payload;
        try {
            const res = await axios.post('/api/login', { name })
            return res.data.user
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error);

            }
        }
    })
export const getUser = createAsyncThunk(
    "users/get",
    async (_, { rejectWithValue }) => {
        try {
            const user = cookies.get("user")
            if (user) {
                return user
            } else {
                return rejectWithValue("You are not authenticated")
            }
        } catch (error) {

            return rejectWithValue(error);
        }
    })

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: (state) => state = { ...state, error: null, isLoading: false },
        logout: (state) => {
            cookies.remove("user", { path: "/" })
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<UserAdmin | null>) => {
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserAdmin | null>) => {
                state.user = action.payload
                cookies.set("user", action.payload, {
                    path: "/",
                    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                })
                state.isLoading = false
            })
    }
})
export const { resetState, logout } = userSlice.actions;
export default userSlice.reducer