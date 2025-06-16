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
    if (value.provinceId) {
      const fetchDistricts = async () => {
        setLoading((prev) => ({ ...prev, districts: true }));
        const data = await getDistricts(value.provinceId!);
        setDistricts(data);
        setLoading((prev) => ({ ...prev, districts: false }));
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [value.provinceId]);

  // Fetch wards when district changes
  useEffect(() => {
    if (value.districtId) {
      const fetchWards = async () => {
        setLoading((prev) => ({ ...prev, wards: true }));
        const data = await getWards(value.districtId!);
        setWards(data);
        setLoading((prev) => ({ ...prev, wards: false }));
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [value.districtId]);

  // Handle form field changes
  const handleChange = (field: string, val: any) => {
    const newData: Partial<ShippingAddress> = { ...value, [field]: val };

    // Reset dependent fields
    if (field === 'provinceId') {
      const selectedProvince = provinces.find((p) => p.ProvinceID === val);
      newData.provinceName = selectedProvince?.ProvinceName || '';
      newData.districtId = undefined;
      newData.districtName = '';
      newData.wardCode = '';
      newData.wardName = '';
    } else if (field === 'districtId') {
      const selectedDistrict = districts.find((d) => d.DistrictID === val);
      newData.districtName = selectedDistrict?.DistrictName || '';
      newData.wardCode = '';
      newData.wardName = '';
    } else if (field === 'wardCode') {
      const selectedWard = wards.find((w) => w.WardCode === val);
      newData.wardName = selectedWard?.WardName || '';
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
          validateStatus={value.provinceId ? 'success' : 'error'}
          help={!value.provinceId && 'Vui lòng chọn Tỉnh/Thành phố'}
        >
          <Select
            placeholder="Chọn Tỉnh/Thành phố"
            value={value.provinceId}
            onChange={(val) => handleChange('provinceId', val)}
            className="w-full"
            loading={loading.provinces}
            notFoundContent={loading.provinces ? <Spin size="small" /> : null}
            showSearch
            optionFilterProp="children"
          >
            {provinces.map((province) => (
              <Option key={province.ProvinceID} value={province.ProvinceID}>
                {province.ProvinceName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Quận/Huyện"
          required
          validateStatus={value.districtId ? 'success' : 'error'}
          help={!value.districtId && 'Vui lòng chọn Quận/Huyện'}
        >
          <Select
            placeholder="Chọn Quận/Huyện"
            value={value.districtId}
            onChange={(val) => handleChange('districtId', val)}
            className="w-full"
            disabled={!value.provinceId}
            loading={loading.districts}
            notFoundContent={loading.districts ? <Spin size="small" /> : null}
            showSearch
            optionFilterProp="children"
          >
            {districts.map((district) => (
              <Option key={district.DistrictID} value={district.DistrictID}>
                {district.DistrictName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Phường/Xã"
          required
          validateStatus={value.wardCode ? 'success' : 'error'}
          help={!value.wardCode && 'Vui lòng chọn Phường/Xã'}
        >
          <Select
            placeholder="Chọn Phường/Xã"
            value={value.wardCode}
            onChange={(val) => handleChange('wardCode', val)}
            className="w-full"
            disabled={!value.districtId}
            loading={loading.wards}
            notFoundContent={loading.wards ? <Spin size="small" /> : null}
            showSearch
            optionFilterProp="children"
          >
            {wards.map((ward) => (
              <Option key={ward.WardCode} value={ward.WardCode}>
                {ward.WardName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <Form.Item
        label="Địa chỉ cụ thể"
        required
        validateStatus={value.address ? 'success' : 'error'}
        help={!value.address && 'Vui lòng nhập địa chỉ cụ thể'}
      >
        <Input.TextArea
          placeholder="Số nhà, tên đường, khu phố/thôn/xóm..."
          value={value.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={3}
        />
      </Form.Item>
    </div>
  );
};

export default AddressForm;
