import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload,
            state.isLoggedIn = true
        },
        logoutUser: (state, action) => {
            state.user = null,
            state.isLoggedIn = false
        }
    }
})

export default userSlice.reducer;
export const {loginUser , logoutUser} = userSlice.actions;




 