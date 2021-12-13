/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Import all necessary libraries and components for this component
import React, { useState } from 'react';
import * as Icon from 'react-feather';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { filterCountriesByRegion, filterCountriesBySearch } from '../../redux';
import SideBarShadow from '../sidebar/SideBarShadow';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import LandingCard from './LandingCards';

// Create landing page component component
const Landing = () => {
  // Declare react libraries, react states and redux states
  const dispatch = useDispatch();
  const ActiveTheme = useSelector((state) => state.ActiveTheme);
  const [AutoCompleteData, setAutoCompleteData] = useState({
    status: false,
    visibility: false,
    text: '',
    data: [],
    FilteredData: []
  });
  const [FilterRegion, setFilterRegion] = useState({
    status: false,
    text: 'Filter By Region',
  });

  // Create function to trigger Filter country by region and change state to update filter input placeholder
  function HandleRegionFilter(e, { status, text }) {
    e.stopPropagation();
    if (status === true) {
      return setFilterRegion({ ...FilterRegion, status: true });
    }
    if (status === false && text !== undefined) {
      setFilterRegion({ status: false, text });
      if (text !== 'Filter By Region') {
        dispatch(filterCountriesByRegion(text));
      }
    } else {
      return setFilterRegion({ ...FilterRegion, status: false });
    }
  }

  // Create function to trigger Filter country by keyword
  const HandleCountrySearch = ({ slug }) => {
    setAutoCompleteData({ ...AutoCompleteData, visibility: !AutoCompleteData.visibility, text: slug });
    dispatch(filterCountriesBySearch(slug));
  };
  // Create function to trigger autoComplete
  const HandleAutoComplete = (slug) => {
    const newData = AutoCompleteData.data.filter((el) => el.name.common.toLowerCase().match(slug.toLowerCase()));
    return setAutoCompleteData({ ...AutoCompleteData, FilteredData: newData, text: slug });
  };

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
          onClick={(e) => HandleRegionFilter(e, { status: false })}
        >
          <div className="landing-wrapper1">
            <div onKeyPress={() => setAutoCompleteData({ ...AutoCompleteData, visibility: true })}>
              <Icon.Search
                className="search-icon"
                size={18}
                color={ActiveTheme.ModeTextColor}
              />
              <input
                type="text"
                placeholder="Search For a Country...."
                value={AutoCompleteData.text}
                onChange={(e) => HandleAutoComplete(e.target.value)}
                style={{ color: `${ActiveTheme.ModeTextColor}` }}
              />
              {AutoCompleteData.visibility && (
              <ul>
                {AutoCompleteData.status && AutoCompleteData.FilteredData.map((info) => (
                  <li
                    key={uuidv4()}
                    style={{ color: `${ActiveTheme.ModeDropColor}` }}
                    onClick={() => HandleCountrySearch({ slug: info.name.common })}
                  >
                    {info.name.common}
                  </li>
                ))}
              </ul>
              )}
            </div>
            <div onClick={(e) => HandleRegionFilter(e, { status: true })}>
              <input
                type="text"
                placeholder={FilterRegion.text}
                disabled
                style={{ color: `${ActiveTheme.ModeTextColor}` }}
              />
              <Icon.ChevronDown
                className="arrow-icon"
                size={14}
                color={ActiveTheme.ModeTextColor}
              />
              {FilterRegion.status && (
              <ul>
                <li
                  style={{ color: `${ActiveTheme.ModeDropColor}` }}
                  onClick={(e) => HandleRegionFilter(e, { status: false, text: 'Africa' })}
                >
                  Africa
                </li>
                <li
                  style={{ color: `${ActiveTheme.ModeDropColor}` }}
                  onClick={(e) => HandleRegionFilter(e, { status: false, text: 'America' })}
                >
                  America
                </li>
                <li
                  style={{ color: `${ActiveTheme.ModeDropColor}` }}
                  onClick={(e) => HandleRegionFilter(e, { status: false, text: 'Asia' })}
                >
                  Asia
                </li>
                <li
                  style={{ color: `${ActiveTheme.ModeDropColor}` }}
                  onClick={(e) => HandleRegionFilter(e, { status: false, text: 'Europe' })}
                >
                  Europe
                </li>
                <li
                  style={{ color: `${ActiveTheme.ModeDropColor}` }}
                  onClick={(e) => HandleRegionFilter(e, { status: false, text: 'Oceania' })}
                >
                  Oceania
                </li>
              </ul>
              )}
            </div>
          </div>
          <LandingCard ActiveTheme={ActiveTheme} setAutoCompleteData={setAutoCompleteData} AutoCompleteData={AutoCompleteData} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
