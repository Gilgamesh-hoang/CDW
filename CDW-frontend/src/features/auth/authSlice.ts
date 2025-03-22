import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService, { AuthPayload, LoginParams, RegisterParams } from './authService';
import { User } from '../../models';
import ErrorResponse from '@/models/responses/ErrorResponse';
import ThunkError from '@/models/responses/ThunkError';
import AbstractState from '@/models/states/AbstractState';
import { handleFulfilledCase, handlePendingCase, handleRejectedCase } from '@/utils/handleBuilderCase';

export const register = createAsyncThunk<
AuthPayload, 
RegisterParams, 
ThunkError
>(
  'auth/register',
  async (user: RegisterParams, thunkAPI) => {
    try {
      const resp = await AuthService.register(user);
      return resp;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);
export const login = createAsyncThunk<
AuthPayload, 
RegisterParams, 
ThunkError
>(
  'auth/login',
  async (user: LoginParams, thunkAPI) => {
    try {
      const resp = await AuthService.login(user);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);
export type InitStateAuthType = AbstractState & {me: User | null}
const initialState: InitStateAuthType = {
  me: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.me = action.payload;
    },
    resetAuthState(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder      
      .addCase(register.pending, handlePendingCase)
      .addCase(register.fulfilled, (state,action) => {
        handleFulfilledCase(state, action);
      })
      .addCase(register.rejected, handleRejectedCase)
      .addCase(login.pending, handlePendingCase)
      .addCase(login.fulfilled, (state, action) => {
      handleFulfilledCase(state, action);
      state.me = action.payload.data;
      })
      .addCase(login.rejected, handleRejectedCase);
  },
});
export const { setCurrentUser, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
