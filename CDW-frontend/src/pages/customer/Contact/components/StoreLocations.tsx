import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

const stores = [
  {
    id: 1,
    name: 'Nike Store Nguyễn Huệ',
    address: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    phone: '(028) 3822 9999',
    hours: 'Thứ 2 - Chủ nhật: 9:00 - 21:00',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5177580425906!2d106.70141917465645!3d10.771595089387881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3a5bb9305!2zMTIzIE5ndXnhu4VuIEh14buHLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1698758012090!5m2!1svi!2s',
  },
  {
    id: 2,
    name: 'Nike Store Vincom Center',
    address: '72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    phone: '(028) 3821 8888',
    hours: 'Thứ 2 - Chủ nhật: 10:00 - 22:00',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4082357252334!2d106.7031537746566!3d10.777868889320216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4b7d0e40481c0572!2zNzIgTMOqIFRow6FuaCBUw7RuLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1698758072753!5m2!1svi!2s',
  },
  {
    id: 3,
    name: 'Nike Store Aeon Mall Tân Phú',
    address: '30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú, TP. Hồ Chí Minh',
    phone: '(028) 3849 7777',
    hours: 'Thứ 2 - Chủ nhật: 10:00 - 22:00',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5505456904703!2d106.62229557465627!3d10.769459589409792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752dfd21f16c95%3A0x2136c7e8889c8889!2zMzAgQuG7nSBCYW8gVMOibiBUaOG6r25nLCBTxqFuIEvhu7MsIFTDom4gUGjDuiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1698758139289!5m2!1svi!2s',
  },
];

const StoreLocations: React.FC = () => {
  const [activeStore, setActiveStore] = useState(stores[0]);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#291D4C] md:text-4xl">
            Cửa Hàng Của Chúng Tôi
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#291D4C]"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-700">
            Ghé thăm các cửa hàng Nike Store để trải nghiệm và mua sắm sản phẩm
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/3">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h3 className="mb-4 text-xl font-bold text-[#291D4C]">
                Danh sách cửa hàng
              </h3>
              <div className="space-y-3">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => setActiveStore(store)}
                    className={`cursor-pointer rounded-lg p-3 transition-colors ${
                      activeStore.id === store.id
                        ? 'bg-[#291D4C] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <h4 className="font-bold">{store.name}</h4>
                    <p
                      className={`text-sm ${
                        activeStore.id === store.id
                          ? 'text-gray-200'
                          : 'text-gray-600'
                      }`}
                    >
                      {store.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="h-full overflow-hidden rounded-lg bg-white shadow-md">
              <div className="h-96 w-full">
                <iframe
                  src={activeStore.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Bản đồ ${activeStore.name}`}
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="mb-4 text-xl font-bold text-[#291D4C]">
                  {activeStore.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-[#291D4C]" />
                    <span>{activeStore.address}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-3 text-[#291D4C]" />
                    <span>{activeStore.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-3 text-[#291D4C]" />
                    <span>{activeStore.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocations;
