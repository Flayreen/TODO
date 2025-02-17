import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addList,
    editList,
    getTaskLists,
    removeList,
    addTask,
    getTasks,
    removeTask,
    editTask, checkTask, addUserToList
} from "../../services/dbServices.ts";
import {CreateTask, CreateTaskList, TaskDTO, TaskListsDTO} from "../../models/taskLists.ts";
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

export const editTaskList = createAsyncThunk<
    {newTitle: string, id: string},
    {newTitle: string, id: string},
    { rejectValue: ErrorResponse }
>(
    "taskList/editTaskList",
    async (value, { rejectWithValue }) => {
        try {
            await editList(value.id, value.newTitle);
            return {id: value.id, newTitle: value.newTitle};
        } catch (error: any) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
            });
        }
    }
);

export const fetchTasks = createAsyncThunk<
    TaskDTO[],
    void,
    { rejectValue: ErrorResponse }
>(
    "taskList/fetchTasks",
    async (_, { rejectWithValue }) => {
        try {
            return await getTasks();
        } catch (error: any) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
            });
        }
    }
);

export const addNewTask = createAsyncThunk<
    any,
    CreateTask,
    { rejectValue: ErrorResponse }
>(
    "taskList/addNewTask",
    async (value, { rejectWithValue }) => {
        try {
            return await addTask(value.listId!, value.title, value.description)
        } catch (error: any) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
            });
        }
    }
);

export const deleteTask = createAsyncThunk<
    {id: string; listId: string},
    {id: string; listId: string},
    { rejectValue: ErrorResponse }
>(
    "taskList/deleteTask",
    async (data, { rejectWithValue }) => {
        try {
            await removeTask(data.id);
            return data;
        } catch (error: any) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
            });
        }
    }
);

export const updateTask = createAsyncThunk<
    {newTitle: string, newDescription: string; id: string; listId: string},
    {newTitle: string, newDescription: string; id: string; listId: string},
    { rejectValue: ErrorResponse }
>(
    "taskList/updateTask",
    async (value, { rejectWithValue }) => {
        try {
            await editTask(value.id, value.newTitle, value.newDescription);
            return value;
        } catch (error: any) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
            });
        }
    }
);

export const updateCompleteTask = createAsyncThunk<
    {isFinished: boolean, id: string; listId: string},
    {isFinished: boolean, id: string; listId: string},
    { rejectValue: ErrorResponse }
>(
    "taskList/updateCompleteTask",
    async (value, { rejectWithValue }) => {
        try {
            await checkTask(value.id, value.isFinished);
            return value;
        } catch (error: any) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
            });
        }
    }
);

export const addUserIntoList = createAsyncThunk<
    {listId: string, email: string},
    {listId: string, email: string},
    { rejectValue: ErrorResponse }
>(
    "taskList/addUserIntoList",
    async (value, { rejectWithValue }) => {
        try {
            await addUserToList(value.listId, value.email);
            return value;
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
        builder
            .addCase(editTaskList.pending, state => {
                state.isLoading = true;
            })
            .addCase(editTaskList.fulfilled, (state, action) => {
                const editedListIndex: number = state.taskLists.findIndex((list: TaskListsDTO) => list.id === action.payload.id);
                state.taskLists[editedListIndex].title = action.payload.newTitle;

                state.isLoading = false;
            })
            .addCase(editTaskList.rejected, (state) => {
                state.isLoading = false;
            });
        builder
            .addCase(addNewTask.pending, state => {
                state.isLoading = true;
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                const listIndex: number = state.taskLists.findIndex((list: TaskListsDTO) => list.id === action.payload.listId);
                state.taskLists[listIndex].tasks.unshift(action.payload);

                state.isLoading = false;
            })
            .addCase(addNewTask.rejected, (state) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchTasks.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.taskLists = state.taskLists.map((list: TaskListsDTO) => ({
                    ...list,
                    tasks: action.payload.filter((task: TaskDTO) => task.listId === list.id),
                }));
                state.isLoading = false;
            })
            .addCase(fetchTasks.rejected, (state) => {
                state.isLoading = false;
            });
        builder
            .addCase(deleteTask.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const listIndex: number = state.taskLists.findIndex((list: TaskListsDTO) => list.id === action.payload.listId);

                if (listIndex !== -1) {
                    state.taskLists[listIndex].tasks = state.taskLists[listIndex].tasks.filter(
                        (task: TaskDTO) => task.id !== action.payload.id
                    );
                }

                state.isLoading = false;
            })
            .addCase(deleteTask.rejected, (state) => {
                state.isLoading = false;
            });
        builder
            .addCase(updateTask.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const listIndex: number = state.taskLists.findIndex((list: TaskListsDTO) => list.id === action.payload.listId);
                const taskIndex: number = state.taskLists[listIndex].tasks.findIndex((task: TaskDTO) => task.id === action.payload.id);

                if (listIndex !== -1 && taskIndex !== -1) {
                    state.taskLists[listIndex].tasks[taskIndex].title = action.payload.newTitle
                    state.taskLists[listIndex].tasks[taskIndex].description = action.payload.newDescription
                }

                state.isLoading = false;
            })
            .addCase(updateTask.rejected, (state) => {
                state.isLoading = false;
            });
        builder
            .addCase(updateCompleteTask.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateCompleteTask.fulfilled, (state, action) => {
                const listIndex: number = state.taskLists.findIndex((list: TaskListsDTO) => list.id === action.payload.listId);
                const taskIndex: number = state.taskLists[listIndex].tasks.findIndex((task: TaskDTO) => task.id === action.payload.id);

                if (listIndex !== -1 && taskIndex !== -1) {
                    state.taskLists[listIndex].tasks[taskIndex].isFinished = action.payload.isFinished;
                }

                state.isLoading = false;
            })
            .addCase(updateCompleteTask.rejected, (state) => {
                state.isLoading = false;
            });
        builder
            .addCase(addUserIntoList.pending, state => {
                state.isLoading = true;
            })
            .addCase(addUserIntoList.fulfilled, (state, action) => {
                const listIndex: number = state.taskLists.findIndex((list: TaskListsDTO) => list.id === action.payload.listId);

                if (listIndex !== -1 ) {
                    state.taskLists[listIndex].viewers.unshift(action.payload.email);
                }

                state.isLoading = false;
            })
            .addCase(addUserIntoList.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default taskListSlice.reducer;