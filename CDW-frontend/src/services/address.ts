import { toast } from 'react-toastify';
import axios from 'axios';

// GHN API URLs
const GHN_API_URL =
  'https://online-gateway.ghn.vn/shiip/public-api/master-data';
const TOKEN_GHN = import.meta.env.VITE_TOKEN_GHN;

// Type definitions for address data
export interface Province {
  ProvinceID: number;
  ProvinceName: string;
  Code: string;
}

export interface District {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Code: string;
  Type: number;
  SupportType: number;
}

export interface Ward {
  WardCode: string;
  DistrictID: number;
  WardName: string;
}

// Function to fetch provinces from GHN API
export const getProvinces = async (): Promise<Province[]> => {
  try {
    const response = await axios.get(`${GHN_API_URL}/province`, {
      headers: {
        'Content-Type': 'application/json',
        Token: TOKEN_GHN,
      },
    });

    if (response.data.code === 200) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching provinces:', error);
    toast.error('Không thể lấy danh sách tỉnh/thành phố');
    return [];
  }
};

// Function to fetch districts by province ID from GHN API
export const getDistricts = async (provinceId: number): Promise<District[]> => {
  try {
    const response = await axios.post(
      `${GHN_API_URL}/district`,
      { province_id: provinceId },
      {
        headers: {
          'Content-Type': 'application/json',
          Token: TOKEN_GHN,
        },
      }
    );

    if (response.data.code === 200) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching districts:', error);
    toast.error('Không thể lấy danh sách quận/huyện');
    return [];
  }
};

// Function to fetch wards by district ID from GHN API
export const getWards = async (districtId: number): Promise<Ward[]> => {
  try {
    const response = await axios.post(
      `${GHN_API_URL}/ward`,
      { district_id: districtId },
      {
        headers: {
          'Content-Type': 'application/json',
          Token: TOKEN_GHN,
        },
      }
    );

    if (response.data.code === 200) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching wards:', error);
    toast.error('Không thể lấy danh sách phường/xã');
    return [];
  }
};
