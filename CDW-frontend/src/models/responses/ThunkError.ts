import { ApiResponse } from '../index.ts';

export default interface ThunkError {
    rejectValue: ApiResponse<void>;
  }