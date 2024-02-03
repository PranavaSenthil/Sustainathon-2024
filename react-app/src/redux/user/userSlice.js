import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    currentUser : null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        sigInInit : (state)=>{
            state.error = null
        },
        signInStart : (state)=>{
            state.loading = true,
            state.error = null
        },
        signInSuccess : (state,action)=>{
            state.currentUser = action.payload,
            state.error = null,
            state.loading = false
        },
        signInFailure : (state,action)=>{
            state.currentUser = null,
            state.error = action.payload,
            state.loading = false
        },
        profileStart: (state)=>{
            state.error = null
        },
        profileSuccess : (state,action)=>{
            state.currentUser = action.payload,
            state.error = null,
            state.loading = false
        },
        profileFailure : (state,action)=>{
            state.error = action.payload,
            state.loading = false
        }
    }
})

export const {sigInInit,signInStart,signInSuccess,signInFailure,profileStart,profileSuccess,profileFailure} = userSlice.actions

export default userSlice.reducer