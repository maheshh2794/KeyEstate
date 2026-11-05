
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const registerApi = createApi({
    reducerPath: 'registerApi',

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
    }),

    endpoints: (builder) => ({

        // Login
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

        // Get User Details
        getDetails: builder.query({
            query: () => ({
                url: '/login',
                method: 'GET',
                headers: {
                    token: window.localStorage.getItem('token') || '',
                },
            })
        }),

        // Update Profile
        updateProfile: builder.mutation({
            query: (profileData) => ({
                url: '/updateprofile',
                method: 'PUT',
                body: profileData,
                headers: {
                    token: window.localStorage.getItem('token') || ''
                }
            })
        }),

        // Get Properties
        getData: builder.query({
            query: () => ({
                url: '/property',
                method: 'GET',
                headers: {
                    token: window.localStorage.getItem('token') || '',
                },
            })
        }),

        // Add Property
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

        // Delete Property
        deleteProperty: builder.mutation({
            query: (id) => ({
                url: `/deleteproperty/${id}`,
                method: "DELETE",
                headers: {
                    token: localStorage.getItem("token") || ''
                }
            })
        }),

        // Add Booking
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

        // Get Bookings by User
        getBookingsbyUser: builder.query({
            query: (userid) => ({
                url: `/bookings/${userid}`,
                method: "GET",
                headers: {
                    token: window.localStorage.getItem("token") || ""
                }
            })
        }),

        // Get Bookings by Seller
        getBookingsbySeller: builder.query({
            query: (sellerid) => ({
                url: `/bookings/requests/${sellerid}`,
                method: "GET",
                headers: {
                    token: window.localStorage.getItem("token") || ""
                }
            })
        }),

        // Delete Booking
        deleteBookings: builder.mutation({
            query: (id) => ({
                url: `/bookings/${id}`,
                method: "DELETE",
                headers: {
                    token: window.localStorage.getItem("token") || ""
                }
            })
        }),

        // Update Booking Status
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

        // Confirm Booking
        confirmBooking: builder.mutation({
            query: (id) => ({
                url: `/confirmbooking/${id}`,
                method: "PATCH",
                headers: {
                    token: window.localStorage.getItem("token") || ""
                }
            })
        }),

        // Add Favorite
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

        // Get Favorites
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

    useGetDetailsQuery,

    useUpdateProfileMutation,

    useGetDataQuery,
    useLazyGetDataQuery,

    useAddPropertyMutation,
    useDeletePropertyMutation,

    useAddBookingMutation,
    useGetBookingsbyUserQuery,
    useLazyGetBookingsbyUserQuery,

    useGetBookingsbySellerQuery,
    useLazyGetBookingsbySellerQuery,

    useDeleteBookingsMutation,
    useUpdateBookingStatusMutation,
    useConfirmBookingMutation,

    useAddFavoriteMutation,
    useGetFavoritesQuery,
    useLazyGetFavoritesQuery

} = registerApi
