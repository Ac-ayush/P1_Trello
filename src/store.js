import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import taskSlice from "./taskSlice";
import authSlice from "./authSlice";

export const store = configureStore({
    reducer:{
        user:userSlice,
        task: taskSlice,
        auth: authSlice,
    },
});

