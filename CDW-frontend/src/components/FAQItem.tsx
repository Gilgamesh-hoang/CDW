import React, { useState, ReactNode } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constant';

export interface FAQItemProps {
  question: string;
  answer: ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
      <button
        className="flex w-full items-center justify-between bg-white p-5 text-left font-medium transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[#291D4C]">{question}</span>
        {isOpen ? (
          <FaChevronUp className="text-[#291D4C]" />
        ) : (
          <FaChevronDown className="text-[#291D4C]" />
        )}
      </button>
      <div
        className={`bg-white px-5 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 py-5' : 'max-h-0'
        }`}
      >
        <div className="text-gray-700">{answer}</div>
      </div>
    </div>
  );
};

export default FAQItem;
