import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import SocialLink from './SocialLink';
import getOnAppStoreImage from '@/assets/get_on_app_store.webp';
import getOnPlayStoreImage from '@/assets/get_on_play_store.webp';
import Button from './Button';
const Footer: React.FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full bg-[#291D4C] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-8">
          <div className="text-sm mb-4">Page updated: 11/02/2025</div>
          <Button
            onClick={handleBackToTop}
            className="border border-white p-3 bg-transparent text-white hover:text-[#291D4C] hover:bg-white"
          >
            Back to the top
          </Button>
        </div>

        {/* Divider line */}
        <div className="border-t border-gray-600 my-6"></div>

        {/* Vietnamese text content */}
        <div className="mb-6">
          <p className="mb-4">
            Chào mừng bạn đến với Nike Shoes! Chúng tôi tự hào mang đến những
            mẫu giày Nike chính hãng, cập nhật xu hướng mới nhất để bạn luôn dẫn
            đầu phong cách.
          </p>
        </div>

        {/* Social media and app links */}
        <div className="flex flex-wrap items-center">
          <div className="flex mb-4 md:mb-0">
            <SocialLink
              icon={<FaFacebookF size={18} />}
              href="https://facebook.com"
            />
            <SocialLink
              icon={<FaTwitter size={18} />}
              href="https://twitter.com"
            />
            <SocialLink
              icon={<FaYoutube size={18} />}
              href="https://youtube.com"
            />
            <SocialLink
              icon={<FaInstagram size={18} />}
              href="https://instagram.com"
            />
            <SocialLink
              icon={<FaLinkedinIn size={18} />}
              href="https://linkedin.com"
            />
          </div>

          <div className="flex ml-0 md:ml-4">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2"
            >
              <img
                loading="lazy"
                src={getOnAppStoreImage}
                alt="Download on App Store"
                className="h-10"
                height={40}
              />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={getOnPlayStoreImage}
                alt="Get it on Google Play"
                className="h-10"
                height={40}
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
