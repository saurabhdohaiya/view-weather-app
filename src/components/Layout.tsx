import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex w-full h-full bg-gray-50 pb-16">
        {children}
      </main>
    </>
  );
};

export default Layout;
