/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSidebar } from '../../redux';

// create sidebar shadow component which will occur on mobile scrren size and destructure data from parent component as props
export default function SideBarShadow() {
  const dispatch = useDispatch();
  const sibarStatus = useSelector((state) => state.sibarStatus);
  // function to hide menu on small screen when menu icon clicked
  const ToggleMenu = () => {
    dispatch(changeSidebar('diactivate'));
  };
  return (
    <div
      className="sidebar-shadow"
      style={{ transform: `${sibarStatus.transform}` }}
      onClick={ToggleMenu}
    />
  );
}
