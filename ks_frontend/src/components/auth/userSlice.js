import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    token: window.localStorage.getItem("token") || null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, {payload}) => {
            state.token = payload.token;
            window.localStorage.setItem("token", payload.token);
        
        },
        logout: (state, action) => {
            state.token = null  
            window.localStorage.removeItem('token');
            
        }
    }
})

export const { login, logout } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer;