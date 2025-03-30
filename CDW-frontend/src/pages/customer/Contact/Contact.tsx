import React from 'react';
import ContactHero from './components/ContactHero.tsx';
import ContactInfo from './components/ContactInfo.tsx';
import ContactForm from './components/ContactForm.tsx';
import StoreLocations from './components/StoreLocations.tsx';
import ContactFAQ from './components/ContactFAQ.tsx';

const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <StoreLocations />
      <ContactFAQ />
    </div>
  );
};

export default Contact;
