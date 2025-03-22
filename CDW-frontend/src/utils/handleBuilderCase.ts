import ErrorResponse from "@/models/responses/ErrorResponse";
import AbstractState from "@/models/states/AbstractState";
import { PayloadAction } from "@reduxjs/toolkit";

export const handlePendingCase = (state:AbstractState)=>{
    state.isLoading = true;
    state.isError = false;
    state.isSuccess = false;
    state.message = '';
}
export const handleFulfilledCase = (state:AbstractState, action:PayloadAction<{ mes: string },string,unknown>)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.message = action.payload?.mes;
}
export const handleRejectedCase = (state:AbstractState,action:PayloadAction<ErrorResponse | undefined,string,unknown>)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload?.mes || 'Something went wrong';
}