import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Spin } from 'antd';
import {
  District,
  Province,
  Ward,
  getDistricts,
  getProvinces,
  getWards,
} from '@/services/address';
import { ShippingAddress } from '@/services/checkout';

const { Option } = Select;

interface AddressFormProps {
  onChange: (address: Partial<ShippingAddress>) => void;
  value?: Partial<ShippingAddress>;
}

const AddressForm: React.FC<AddressFormProps> = ({ onChange, value = {} }) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState({
    provinces: false,
    districts: false,
    wards: false,
  });
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
    null
  );

  // Fetch provinces on component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading((prev) => ({ ...prev, provinces: true }));
      const data = await getProvinces();
      setProvinces(data);
      setLoading((prev) => ({ ...prev, provinces: false }));
    };
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (selectedProvinceId) {
      const fetchDistricts = async () => {
        setLoading((prev) => ({ ...prev, districts: true }));
        const data = await getDistricts(selectedProvinceId);
        setDistricts(data);
        setLoading((prev) => ({ ...prev, districts: false }));
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedProvinceId]);

  // Fetch wards when district changes
  useEffect(() => {
    if (selectedDistrictId) {
      const fetchWards = async () => {
        setLoading((prev) => ({ ...prev, wards: true }));
        const data = await getWards(selectedDistrictId);
        setWards(data);
        setLoading((prev) => ({ ...prev, wards: false }));
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrictId]);

  // Handle form field changes
  const handleChange = (field: string, val: any) => {
    const newData: Partial<ShippingAddress> = { ...value, [field]: val };

    // Handle province/district selection
    if (field === 'province') {
      // Clear dependent fields
      newData.district = '';
      newData.commune = '';

      // Update selectedProvinceId
      const selectedProvince = provinces.find((p) => p.ProvinceName === val);
      if (selectedProvince) {
        setSelectedProvinceId(selectedProvince.ProvinceID);
      }
    } else if (field === 'district') {
      // Clear dependent field
      newData.commune = '';

      // Update selectedDistrictId
      const selectedDistrict = districts.find((d) => d.DistrictName === val);
      if (selectedDistrict) {
        setSelectedDistrictId(selectedDistrict.DistrictID);
      }
    }

    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Họ và tên"
          required
          validateStatus={value.fullName ? 'success' : 'error'}
          help={!value.fullName && 'Vui lòng nhập họ và tên'}
        >
          <Input
            placeholder="Nhập họ tên người nhận"
            value={value.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          required
          validateStatus={value.phoneNumber ? 'success' : 'error'}
          help={!value.phoneNumber && 'Vui lòng nhập số điện thoại'}
        >
          <Input
            placeholder="Nhập số điện thoại"
            value={value.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Form.Item
          label="Tỉnh/Thành phố"
          required
          validateStatus={value.province ? 'success' : 'error'}
          help={!value.province && 'Vui lòng chọn Tỉnh/Thành phố'}
        >
          <Select
            placeholder="Chọn Tỉnh/Thành phố"
            value={value.province}
            onChange={(val) => handleChange('province', val)}
            className="w-full"
            loading={loading.provinces}
            notFoundContent={loading.provinces ? <Spin size="small" /> : null}
            showSearch
            optionFilterProp="children"
          >
            {provinces.map((province) => (
              <Option key={province.ProvinceID} value={province.ProvinceName}>
                {province.ProvinceName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Quận/Huyện"
          required
          validateStatus={value.district ? 'success' : 'error'}
          help={!value.district && 'Vui lòng chọn Quận/Huyện'}
        >
          <Select
            placeholder="Chọn Quận/Huyện"
            value={value.district}
            onChange={(val) => handleChange('district', val)}
            className="w-full"
            disabled={!value.province}
            loading={loading.districts}
            notFoundContent={loading.districts ? <Spin size="small" /> : null}
            showSearch
            optionFilterProp="children"
          >
            {districts.map((district) => (
              <Option key={district.DistrictID} value={district.DistrictName}>
                {district.DistrictName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Phường/Xã"
          required
          validateStatus={value.commune ? 'success' : 'error'}
          help={!value.commune && 'Vui lòng chọn Phường/Xã'}
        >
          <Select
            placeholder="Chọn Phường/Xã"
            value={value.commune}
            onChange={(val) => handleChange('commune', val)}
            className="w-full"
            disabled={!value.district}
            loading={loading.wards}
            notFoundContent={loading.wards ? <Spin size="small" /> : null}
            showSearch
            optionFilterProp="children"
          >
            {wards.map((ward) => (
              <Option key={ward.WardCode} value={ward.WardName}>
                {ward.WardName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <Form.Item
        label="Địa chỉ cụ thể"
        required
        validateStatus={value.hamlet ? 'success' : 'error'}
        help={!value.hamlet && 'Vui lòng nhập địa chỉ cụ thể'}
      >
        <Input.TextArea
          placeholder="Số nhà, tên đường, khu phố/thôn/xóm..."
          value={value.hamlet}
          onChange={(e) => handleChange('hamlet', e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={3}
        />
      </Form.Item>
    </div>
  );
};

export default AddressForm;
