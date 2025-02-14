// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import {addList} from "../../services/dbServices.ts";
//
// interface TaskListState {
//     taskLists: any;
//     isLoading: boolean;
// }
//
// const initialState: TaskListState = {
//     taskLists: [],
//     isLoading: false,
// };
//
// export const createTaskList = createAsyncThunk(
//     "taskList/createTaskList",
//     async (values, {rejectWithValue}) => {
//         try {
//             return await addList({name: "test"})
//         } catch (error) {
//             return rejectWithValue({
//                 status: error.response.status,
//                 data: error.response.data,
//                 hideError: true,
//             })
//         }
//     })
//
// const taskListSlice = createSlice<TaskListState>({
//     name: "taskList",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(createTaskList.pending, state => {
//                 state.isLoading = true;
//             })
//             .addCase(createTaskList.fulfilled, (state, action) => {
//                 state.taskLists.push(action.payload);
//                 state.isLoading = false;
//             })
//             .addCase(createTaskList.rejected, (state) => {
//                 state.isLoading = false;
//             })
//     }
// });
//
// export default taskListSlice.reducer;