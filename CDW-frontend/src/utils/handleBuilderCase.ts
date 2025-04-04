import AbstractState from '@/models/states/AbstractState';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse } from '../models';

export const handlePendingCase = (state: AbstractState) => {
  state.isLoading = true;
  state.isError = false;
  state.isSuccess = false;
  state.message = '';
};
export const handleFulfilledCase = (state: AbstractState, action: PayloadAction<{ message: string }>) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload?.message;
};
export const handleRejectedCase = (state: AbstractState, action: PayloadAction<ApiResponse<void> | undefined, string, unknown>) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload?.message || 'Something went wrong';
};