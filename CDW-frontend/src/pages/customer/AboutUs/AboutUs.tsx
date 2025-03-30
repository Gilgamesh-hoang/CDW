import React from 'react';
import AboutHero from './components/AboutHero.tsx';
import OurStory from './components/OurStory.tsx';
import OurMission from './components/OurMission.tsx';
import OurTeam from './components/OurTeam.tsx';
import Brands from './components/Brands.tsx';

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
