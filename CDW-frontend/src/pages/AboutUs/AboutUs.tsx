import React from 'react';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import OurMission from './components/OurMission';
import OurTeam from './components/OurTeam';
import Brands from './components/Brands';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white">
      <AboutHero />
      <OurStory />
      <OurMission />
      <OurTeam />
      <Brands />
    </div>
  );
};

export default AboutUs;
