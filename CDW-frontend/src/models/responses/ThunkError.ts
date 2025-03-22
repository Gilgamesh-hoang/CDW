import ErrorResponse from "./ErrorResponse";

export default interface ThunkError {
    rejectValue: ErrorResponse;
  }