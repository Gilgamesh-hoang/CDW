import React from 'react';

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white text-[#291D4C] rounded-full w-12 h-12 flex items-center justify-center mr-2"
  >
    {icon}
  </a>
);

export default SocialLink;
