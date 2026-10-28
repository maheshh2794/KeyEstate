
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

        addProperty: builder.mutation({
            query: (propertyData) => ({
                url: '/addproperty',
                method: 'POST',
                body: propertyData,
                headers: {
                    token: window.localStorage.getItem('token') || '',
                }
            })
        }),

        addBooking: builder.mutation({
            query: (bookingData) => ({
                url: "/bookings",
                method: "POST",
                body: bookingData,
                headers: {
                    token: window.localStorage.getItem("token") || ""
                }
            })
        }),

        getBookings: builder.query({
            query: () => ({
                url: "/bookings",
                method: "GET",
                headers: {
                    token: window.localStorage.getItem("token") || ""
                }
            })
        }),
        addFavorite: builder.mutation({
            query: (data) => ({
                url: "/favorites",
                method: "POST",
                headers: {
                    token: window.localStorage.getItem("token"),
                },
                body: data,
            }),
        }),

        getFavorites: builder.query({
            query: (params) => ({
                url: `/favorites/${params}`,
                method: "GET",
                headers: {
                    token: window.localStorage.getItem("token"),
                },
            
            }),
        }),
    }),
})

export const {
    useLoginUserMutation,
    useGetDataQuery,
    useAddPropertyMutation,
    useAddBookingMutation,
    useGetBookingsQuery,
    useAddFavoriteMutation,
    useGetFavoritesQuery,
    useLazyGetFavoritesQuery
} = registerApi