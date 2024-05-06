import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { authApi } from "./services/auth-service"
import { RegisterauthApi } from "./services/register-service";
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from "./features/auth-slice";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [RegisterauthApi.reducerPath]: RegisterauthApi.reducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,  RegisterauthApi.middleware),
    devTools: true
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch