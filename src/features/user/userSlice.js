import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import {
    addUserToLocalStorage,
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk";
import { clearStoreThunk } from './userThunk';
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(user, thunkAPI) => {
        return registerUserThunk('auth/register', user, thunkAPI);
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(user, thunkAPI) => {
        return loginUserThunk('auth/login', user, thunkAPI);
    }
);

export const updateUser = createAsyncThunk(
    ' user/updateUser', async(user, thunkAPI) => {
        return updateUserThunk('auth/updateUser', user, thunkAPI);
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state, {payload}) => {
            state.user = null;
            state.isSidebarOpen = false;
            toast.success('Logout Successful!');
            removeUserFromLocalStorage();

            if (payload) {
                toast.success(payload);
            }
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
    },
    extraReducers: {
        // Register user
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },

        [registerUser.fulfilled]: (state, {payload}) => {
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello there, ${user.name}`)
        },

        [registerUser.rejected]: (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        },

        // Login user
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },

        [loginUser.fulfilled]: (state, {payload}) => {
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            toast.success(`Welcome back, ${user.name}`)
        },

        [loginUser.rejected]: (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        },

        // Update user
        [updateUser.pending]: (state) => {
            state.isLoading = true;
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
        
            addUserToLocalStorage(user);
            toast.success('User Updated');
        },
        [updateUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },

        // Clear user
        [clearStore.rejected]: () => {
            toast.error('There was an error');
          },
      },     
});

export const { logoutUser, toggleSidebar } = userSlice.actions;
export default userSlice.reducer;