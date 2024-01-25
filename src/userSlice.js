import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users: [
        {
            email: "u1@gmail.com",
            password: 1234,
            details:{
                name: "user1",
                role: "admin",
                phone: 9292,
            },
        },
    ],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        addUser:(state, action) => {
            state.users.push(action.payload) ;
        },
        updateUserDetails:(state, action) => {
            const { email, name, role, phone} = action.payload;
            state.users = state.users.map((user)=>
                user.email === email 
                ? {...user, details: {...user.details, name, role, phone}}
                :user
            );   

        },
    },
});

export const {addUser, updateUserDetails} = userSlice.actions;

export default userSlice.reducer;