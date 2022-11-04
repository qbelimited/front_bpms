import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../Services/Auth-services";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await AuthService.login(email, password);
            return{user : data}
        }catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
          }
    }
)

export const logout = createAsyncThunk(
    "auth/logout", 
    async () => {
    await AuthService.logout();
  });

const initialState = user
  ? { isLoading: false, isLoggedIn: true, user }
  : { isLoading: false, isLoggedIn: false, user: null };

  const loginSlice = createSlice({
    name: 'login',
    initialState,
    extraReducers: {
        [login.pending]: (state) =>{
            state.isLoading = true
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.isLoading = false
            state.user = action.payload.user;
          },
          [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = false
          },
          [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    }
  })

  const { reducer } = loginSlice;
export default reducer;