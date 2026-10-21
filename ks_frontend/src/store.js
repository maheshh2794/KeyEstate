import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { registerApi } from "./services/registerApi";
import userReducer from "./components/auth/userSlice";

export const store = configureStore({
    reducer: {
        Ruser: userReducer,
        [registerApi.reducerPath]: registerApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(registerApi.middleware),
});

setupListeners(store.dispatch);