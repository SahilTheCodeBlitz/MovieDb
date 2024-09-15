// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx'; // Import the Header component

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Renders the component for the current route */}
      </main>
    </div>
  );
};

export default Layout;
