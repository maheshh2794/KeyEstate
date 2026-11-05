
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: window.localStorage.getItem("token") || null,
    name: window.localStorage.getItem("name") || null,
    email: window.localStorage.getItem("email") || null,
    age: window.localStorage.getItem("age") || null,
    gender: window.localStorage.getItem("gender") || null,
    number: window.localStorage.getItem("number") || null,
    role: window.localStorage.getItem("role") || null,
    id: window.localStorage.getItem("id") || null,
    property: window.localStorage.getItem("propertyid") || null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        login: (state, { payload }) => {
            state.token = payload.token
            state.name = payload.name
            state.email = payload.email
            state.age = payload.age ?? null
            state.gender = payload.gender
            state.number = payload.number ?? null
            state.role = payload.role
            state.id = payload.id

            window.localStorage.setItem("token", payload.token)
            window.localStorage.setItem("name", payload.name || "")
            window.localStorage.setItem("email", payload.email || "")
            window.localStorage.setItem("age", payload.age ?? "")
            window.localStorage.setItem("gender", payload.gender || "")
            window.localStorage.setItem("number", payload.number ?? "")
            window.localStorage.setItem("role", payload.role || "")
            window.localStorage.setItem("id", payload.id)
        },

        logout: (state) => {
            state.token = null
            state.name = null
            state.email = null
            state.age = null
            state.gender = null
            state.number = null
            state.role = null
            state.id = null
            state.property = null

            window.localStorage.removeItem("token")
            window.localStorage.removeItem("name")
            window.localStorage.removeItem("email")
            window.localStorage.removeItem("age")
            window.localStorage.removeItem("gender")
            window.localStorage.removeItem("number")
            window.localStorage.removeItem("role")
            window.localStorage.removeItem("id")
            window.localStorage.removeItem("propertyid")
        },

        viewproperty: (state, { payload }) => {
            state.property = payload
            window.localStorage.setItem("propertyid", payload)
        }
    }
})

export const { login, logout, viewproperty } = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
