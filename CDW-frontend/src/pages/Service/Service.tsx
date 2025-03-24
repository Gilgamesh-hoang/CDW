import React from 'react';
import ServiceHero from './components/ServiceHero';
import ServiceOfferings from './components/ServiceOfferings';
import CustomizationService from './components/CustomizationService';
import AfterSalesService from './components/AfterSalesService';
import MembershipBenefits from './components/MembershipBenefits';
import FAQ from './components/FAQ';

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
