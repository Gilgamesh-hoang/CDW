import { AbstractModel } from './base/AbstractModel';
import { UserRole } from './enums';

export interface User extends AbstractModel {
  username: string;
  email?: string;
  role: UserRole;
  points: number;
  verified: boolean;
  fullName?: string;
  address?: string;
  zalo?: string;
  facebook?: string;
  tiktok?: string;
  shopee?: string;
  telegram?: string;
  phone?: string;
}
