import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getUsers,
} from "../../services/dbServices.ts";
import {ErrorResponse} from "react-router-dom";
import {UserInfo} from "../../models/user.ts";

export interface UsersState {
    users: UserInfo[];
    isLoading: boolean;
}

const initialState: UsersState = {
    users: [],
    isLoading: false,
};


export const fetchUsers = createAsyncThunk<
    UserInfo[],
    void,
    { rejectValue: ErrorResponse }
>(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            return await getUsers();
        } catch (error: any) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
            });
        }
    }
);




const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default usersSlice.reducer;