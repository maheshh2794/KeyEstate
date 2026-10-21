
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const registerApi = createApi({
    reducerPath: 'registerApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),

    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        getData: builder.query({
            query: () => ({
                url: '/property',
                method: 'GET',
                headers: {
                    token: window.localStorage.getItem('token') || '',
                },
            })
        }),
    }),
})


export const { useLoginUserMutation, useGetDataQuery } = registerApi
