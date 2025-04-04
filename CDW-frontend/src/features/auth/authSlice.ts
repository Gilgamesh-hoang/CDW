import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService, { LoginParams } from './authService';
import { ApiResponse, User } from '../../models';
import AbstractState from '@/models/states/AbstractState';
import { handleFulfilledCase, handlePendingCase, handleRejectedCase } from '@/utils/handleBuilderCase';
import { getCurrentUser } from '../../services/user.ts';

// export const register = createAsyncThunk<
//   AuthPayload,
//   RegisterParams,
//   ThunkError
// >(
//   'auth/register',
//   async (user: RegisterParams, thunkAPI) => {
//     try {
//       const resp = await AuthService.register(user);
//       return resp;
//     } catch (error: unknown) {
//       return thunkAPI.rejectWithValue(error as ApiResponse<void>);
//     }
//   },
// );


export const login = createAsyncThunk<
  ApiResponse<User>,
  LoginParams,
  { rejectValue: ApiResponse<void> }
>(
  'auth/login',
  async (user: LoginParams, thunkAPI) => {
    try {
      return await AuthService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ApiResponse<void>);
    }
  },
);

// Thunk để lấy thông tin user hiện tại
export const fetchCurrentUser = createAsyncThunk<
  ApiResponse<User>, // Kiểu trả về
  void, // Kiểu tham số đầu vào (không có)
  { rejectValue: ApiResponse<void> } // Kiểu reject
>(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ApiResponse<void>);
    }
  },
);

export const logout = createAsyncThunk<
  ApiResponse<void>, // Kiểu trả về
  void, // Kiểu tham số đầu vào (không có)
  { rejectValue: ApiResponse<void> } // Kiểu reject
>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      return await AuthService.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ApiResponse<void>);
    }
  },
);

export type InitStateAuthType = AbstractState & { me: User | null }

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
      state.me = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(register.pending, handlePendingCase)
      // .addCase(register.fulfilled, (state, action) => {
      //   handleFulfilledCase(state, action);
      // })
      // .addCase(register.rejected, handleRejectedCase)


      // Handle login
      .addCase(login.pending, handlePendingCase)
      .addCase(login.fulfilled, (state, action) => {
        handleFulfilledCase(state, action);
        state.me = action.payload.data;
      })
      .addCase(login.rejected, handleRejectedCase)

      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, handlePendingCase)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        handleFulfilledCase(state, action);
        state.me = action.payload.data; // Cập nhật state.me với user từ API
      })
      .addCase(fetchCurrentUser.rejected, handleRejectedCase)

      // logout
      .addCase(logout.pending, handlePendingCase)
      .addCase(logout.fulfilled, (state, action) => {
        state.me = null;
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = '';
      })
      .addCase(logout.rejected, handleRejectedCase)
  },
});
export const { setCurrentUser, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
