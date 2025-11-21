import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router';

export default function PageLayout() {
  return (
    <div className="page-layout">
      <style>{`
        .page-layout {
          background-color: #212121;
          min-height: 100vh;
          color: white;
        }
      `}</style>
      <Navbar />
      <Outlet />
    </div>
  );
}
