import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./slices/taskListSlice.ts";
import usersReducer from "./slices/usersSlice.ts";

export const store = configureStore({
    reducer: {
        taskList: taskListReducer,
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;