import React from 'react';
import ServiceHero from './components/ServiceHero.tsx';
import ServiceOfferings from './components/ServiceOfferings.tsx';
import CustomizationService from './components/CustomizationService.tsx';
import AfterSalesService from './components/AfterSalesService.tsx';
import MembershipBenefits from './components/MembershipBenefits.tsx';
import FAQ from './components/FAQ.tsx';

const Service: React.FC = () => {
  return (
    <div className="bg-white">
      <ServiceHero />
      <ServiceOfferings />
      <CustomizationService />
      <AfterSalesService />
      <MembershipBenefits />
      <FAQ />
    </div>
  );
};

export default Service;
