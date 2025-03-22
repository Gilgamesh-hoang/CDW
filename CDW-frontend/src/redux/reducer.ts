import authSlice, { InitStateAuthType } from '../features/auth/authSlice';
export interface RootState {
  auth: InitStateAuthType;
}
const rootReducer = {
  auth: authSlice,
};

export default rootReducer;
