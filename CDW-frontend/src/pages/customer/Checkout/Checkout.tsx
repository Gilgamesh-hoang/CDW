import React, { useEffect, useState } from 'react';
import { Steps, Spin, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getCart } from '@/services/cart';
import { Product } from '@/models';
import {
  CheckoutData,
  OrderItem,
  ShippingAddress,
  submitOrder,
} from '@/services/checkout';
import AddressForm from './components/AddressForm';
import PaymentMethods from './components/PaymentMethods';
import OrderSummary from './components/OrderSummary';
import HeroSectionSimple from '@/components/HeroSectionSimple';
import { ROUTES } from '@/utils/constant';

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState({
    cart: true,
    submit: false,
  });
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState<Partial<ShippingAddress>>({});
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [note, setNote] = useState('');
  const [orderId, setOrderId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading((prev) => ({ ...prev, cart: true }));
      try {
        const items = await getCart();
        setCartItems(items);

        // Redirect to cart if there are no items
        if (items.length === 0) {
          navigate(ROUTES.CART.url);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading((prev) => ({ ...prev, cart: false }));
      }
    };

    fetchCartItems();
  }, [navigate]);

  // Check if form is valid
  const isFormValid = () => {
    const requiredAddressFields: (keyof ShippingAddress)[] = [
      'fullName',
      'phoneNumber',
      'province',
      'district',
      'commune',
      'hamlet',
    ];

    return requiredAddressFields.every((field) => Boolean(address[field]));
  };

  // Convert cart items to order items
  const prepareOrderItems = (): OrderItem[] => {
    return cartItems.map((item) => ({
      productId: item.id,
      sizeId: item.sizeId || 0,
      quantity: item.quantity || 1,
    }));
  };

  // Handle checkout submission
  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }

    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      const orderItems = prepareOrderItems();

      const checkoutData: CheckoutData = {
        shippingAddress: address as ShippingAddress,
        paymentMethod: paymentMethod,
        orderItems: orderItems,
        note: note || undefined,
      };

      const result = await submitOrder(checkoutData);

      if (result.success && result.data) {
        // Navigate to order success page with the order slug
        const slug = result.data.slug;
        navigate(ROUTES.ORDER_SUCCESS.url.replace(':slug', slug));
        return;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  // Show loading if cart is being fetched
  if (loading.cart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSectionSimple
        imageUrl="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
        title="THANH TOÁN"
        heightStyle={'h-[30vh]'}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Checkout steps */}
        <Steps
          current={step}
          onChange={setStep}
          className="mb-8"
          items={[
            {
              title: 'Địa chỉ giao hàng',
            },
            {
              title: 'Phương thức thanh toán',
            },
            {
              title: 'Xác nhận đơn hàng',
            },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Form content based on current step */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {step === 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-6">
                    Địa chỉ giao hàng
                  </h2>
                  <AddressForm value={address} onChange={setAddress} />
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="text-xl font-semibold mb-6">
                    Chọn phương thức thanh toán
                  </h2>
                  <PaymentMethods
                    selectedPayment={paymentMethod}
                    onChange={setPaymentMethod}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl font-semibold mb-6">
                    Xác nhận thông tin đơn hàng
                  </h2>

                  <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h3 className="font-semibold mb-2">Thông tin người nhận</h3>
                    <p>
                      <strong>Họ tên:</strong> {address.fullName}
                    </p>
                    <p>
                      <strong>Số điện thoại:</strong> {address.phoneNumber}
                    </p>
                    <p>
                      <strong>Địa chỉ:</strong> {address.hamlet},{' '}
                      {address.commune}, {address.district}, {address.province}
                    </p>
                  </div>

                  <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                    <h3 className="font-semibold mb-2">
                      Phương thức thanh toán
                    </h3>
                    <p>
                      {paymentMethod === 'COD'
                        ? 'Thanh toán khi nhận hàng'
                        : paymentMethod === 'ZALOPAY'
                        ? 'Thanh toán qua ZaloPay'
                        : paymentMethod === 'MOMO'
                        ? 'Thanh toán qua MoMo'
                        : 'Thanh toán qua VNPay'}
                    </p>
                  </div>
                </>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                {step > 0 && (
                  <button
                    onClick={() => setStep((prev) => prev - 1)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Quay lại
                  </button>
                )}
                {step < 2 ? (
                  <button
                    onClick={() => setStep((prev) => prev + 1)}
                    disabled={step === 0 && !isFormValid()}
                    className={`px-6 py-2 bg-[#291D4C] text-white rounded-md hover:bg-[#1a1233] transition-colors ml-auto ${
                      step === 0 && !isFormValid()
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    Tiếp tục
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right column - Order summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              note={note}
              onNoteChange={setNote}
              onSubmit={handleSubmit}
              loading={loading.submit}
              isFormValid={step === 2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
