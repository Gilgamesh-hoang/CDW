import React from 'react';
import HeroSection from './components/HeroSection.tsx';
import FeaturedCollection from './components/FeaturedCollection.tsx';
import BenefitsSection from './components/BenefitsSection.tsx';
import TestimonialsSection from './components/TestimonialsSection.tsx';
import NewsletterSection from './components/NewsletterSection.tsx';
import ProductsSliderSection from './components/ProductsSlider.tsx';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ProductsSliderSection />
      <FeaturedCollection />
      <BenefitsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
