import { createApi } from '@reduxjs/toolkit/query/react'
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { store } from '../store';
import { LOGGED_IN, LOGGED_OUT } from '../features/auth-slice';
import { getCookie } from 'react-use-cookie';

const AUTH_URL = 'http://localhost:3000'


const baseQuery = fetchBaseQuery({
    baseUrl: AUTH_URL,
    prepareHeaders: (headers) => {
        const user = getCookie('user') ? JSON.parse(getCookie('user')) : null;
        if (user) {
            headers.set("authorization", `Bearer ${user.token.accessToken}`)
        }
        return headers
    },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        // const refreshToken = api.getState().auth.USER?.token.refreshToken || null;
        const refreshToken = getCookie('user') ? JSON.parse(getCookie('user')).token.refreshToken : null;

        const refresh = await fetch(`${AUTH_URL}/user/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken
            })
        });

        const refreshResult = await refresh.json();

        if (refreshResult) {
            api.dispatch(LOGGED_IN(refreshResult))
        } else {
            api.dispatch(LOGGED_OUT())
        }

        return baseQuery(args, api, extraOptions);
    }
    
    return result;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: (build) => ({
        login: build.mutation({
            query: (credentials) => ({
                url: "user/login",
                method: "POST",
                body: credentials,
            }),
        }),
        me: build.query({
            query: () => "user/me",
        }),
    }),
});



export const { useLoginMutation, useMeQuery, useLazyMeQuery } = authApi;