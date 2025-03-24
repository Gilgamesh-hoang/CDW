import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturedCollection from './components/FeaturedCollection';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import NewsletterSection from './components/NewsletterSection';
import ProductsSliderSection from './components/ProductsSlider';

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
