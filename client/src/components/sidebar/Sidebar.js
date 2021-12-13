/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// create sidebar component
const Sidebar = () => {
  const history = useHistory();
  const ActiveTheme = useSelector((state) => state.ActiveTheme);
  const sibarStatus = useSelector((state) => state.sibarStatus);
  return (
    <div
      className="sidebar-wrapper"
      style={{
        transform: `${sibarStatus.transform}`,
        backgroundColor: `${ActiveTheme.ModeColor}`,
      }}
    >
      <div style={{ color: `${ActiveTheme.ModeTextColor}` }}>BAG</div>
      <ul>
        <li onClick={() => history.push('/mylist')}>MY LIST</li>
        <li>VISITED</li>
        <li>TO VISIT</li>
      </ul>
    </div>
  );
};

export default Sidebar;
