import React from 'react';
import ContactHero from './components/ContactHero';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import StoreLocations from './components/StoreLocations';
import ContactFAQ from './components/ContactFAQ';

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
