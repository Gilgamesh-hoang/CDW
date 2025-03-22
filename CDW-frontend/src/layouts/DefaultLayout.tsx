import React from 'react';
import Header from '../components/Header/Header';
import Footer from '@/components/Footer/Footer';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default DefaultLayout;
