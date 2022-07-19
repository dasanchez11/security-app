import React from 'react';
// import GradientBar from './components/common/GradientBar';
import Navbar from './components/NavBar/NavBar.component';
import Sidebar from './components/Sidebar/Sidebar.component';
import Footer from './components/Footer/Footer.component';

const AppShell = ({ children }) => {
  return (
    <>
      {/* <GradientBar /> */}
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="p-4 border-b border-gray-200 shadow-md">
            <Navbar />
          </div>
          <div className="px-4 sm:px-8 py-2 bg-gray-100">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppShell;