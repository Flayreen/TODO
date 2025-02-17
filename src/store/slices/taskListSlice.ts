import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {addList, getTaskLists, removeList} from "../../services/dbServices.ts";
import {CreateTaskList, TaskListsDTO} from "../../models/taskLists.ts";
import {ErrorResponse} from "react-router-dom";

export interface TaskListState {
    taskLists: TaskListsDTO[];
    isLoading: boolean;
}

const initialState: TaskListState = {
    taskLists: [],
    isLoading: false,
};

export const createTaskList = createAsyncThunk<
    any,
    CreateTaskList,
    { rejectValue: ErrorResponse }
>(
    "taskList/createTaskList",
    async (values, {rejectWithValue}) => {
        try {

            return await addList(values);
        } catch (error: any) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
            })
        }
    })


export const fetchTaskLists = createAsyncThunk<
    TaskListsDTO[],
    void,
    { rejectValue: ErrorResponse }
>(
    "taskList/fetchTaskLists",
    async (_, { rejectWithValue }) => {
        try {
            return await getTaskLists();
        } catch (error: any) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
            });
        }
    }
);

export const removeTaskList = createAsyncThunk<
    string,
    string,
    { rejectValue: ErrorResponse }
>(
    "taskList/removeTaskList",
    async (listId: string, { rejectWithValue }) => {
        try {
            await removeList(listId);
            return listId;
        } catch (error: any) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
            });
        }
    }
);

const taskListSlice = createSlice({
    name: "taskList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTaskList.pending, state => {
                state.isLoading = true;
            })
            .addCase(createTaskList.fulfilled, (state, action) => {
                state.taskLists.unshift(action.payload);
                state.isLoading = false;
            })
            .addCase(createTaskList.rejected, (state) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchTaskLists.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchTaskLists.fulfilled, (state, action) => {
                state.taskLists = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchTaskLists.rejected, (state) => {
                state.isLoading = false;
            });
        builder
            .addCase(removeTaskList.pending, state => {
                state.isLoading = true;
            })
            .addCase(removeTaskList.fulfilled, (state, action) => {
                state.taskLists = state.taskLists.filter((taskList: TaskListsDTO) => taskList.id !== action.payload);
                state.isLoading = false;
            })
            .addCase(removeTaskList.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default taskListSlice.reducer;