
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const registerApi = createApi({
    reducerPath: 'registerApi',

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
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

        getDetails: builder.query({
            query: () => ({
                url: '/login',
                method: 'GET',
                headers: {
                    token: window.localStorage.getItem('token') || '',
                },
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

        deleteProperty: builder.mutation({
            query: (id) => ({
                url: `/deleteproperty/${id}`,
                method: "DELETE",
                headers: {
                    token: localStorage.getItem("token") || ''
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

        getBookingsbyUser: builder.query({
            query: (userid) => ({
                url: `/bookings/${userid}`,
                method: "GET",
                headers: {
                    token: window.localStorage.getItem("token") || ""
                }
            })
        }),

        getBookingsbySeller: builder.query({
            query: (sellerid) => ({
                url: `/bookings/requests/${sellerid}`,
                method: "GET",
                headers: {
                    token: window.localStorage.getItem("token") || ""
                }
            })
        }),

        deleteBookings: builder.mutation({
            query: (id) => ({
                url: `/bookings/${id}`,
                method: "DELETE",
                headers: {
                    token: window.localStorage.getItem("token") || ""
                }
            })
        }),

        updateBookingStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/updatebooking/${id}`,
                method: "PATCH",
                body: { status },
                headers: {
                    token: window.localStorage.getItem("token") || ""
                }
            })
        }),

        confirmBooking: builder.mutation({
            query: (id) => ({
                url: `/confirmbooking/${id}`,
                method: "PATCH",
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
                    token: window.localStorage.getItem("token") || "",
                },
                body: data,
            }),
        }),

        getFavorites: builder.query({
            query: (params) => ({
                url: `/favorites/${params}`,
                method: "GET",
                headers: {
                    token: window.localStorage.getItem("token") || "",
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
    useGetBookingsbyUserQuery,
    useAddFavoriteMutation,
    useGetFavoritesQuery,
    useLazyGetFavoritesQuery,
    useDeleteBookingsMutation,
    useLazyGetBookingsbyUserQuery,
    useGetBookingsbySellerQuery,
    useGetDetailsQuery,
    useUpdateBookingStatusMutation,
    useConfirmBookingMutation,
    useDeletePropertyMutation,
    useLazyGetDataQuery

} = registerApi
