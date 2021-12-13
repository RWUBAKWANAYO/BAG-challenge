/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Import all necessary libraries and components for this component
import React from 'react';
import { useSelector } from 'react-redux';
import SideBarShadow from '../sidebar/SideBarShadow';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import MyListCard from './MyListCard';

// Create landing page component component
const Landing = () => {
  // Declare react libraries, react states and redux states
  const ActiveTheme = useSelector((state) => state.ActiveTheme);

  return (
  // Jsx which contain landing page data
    <div
      className="app-container"
      style={{ backgroundColor: `${ActiveTheme.ModeColor}` }}
    >
      <div className="sidebar-container">
        <SideBarShadow />
        <Sidebar />
      </div>
      <div className="content-container">
        <Navbar />
        <div
          className="landing-container"
        >
          <MyListCard
            ActiveTheme={ActiveTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
