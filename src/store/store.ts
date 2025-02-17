import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./slices/taskListSlice.ts";

export const store = configureStore({
    reducer: {
        taskList: taskListReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;