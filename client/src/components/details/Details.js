/* eslint-disable react/prop-types */
// Import all necessary libraries and components for this component
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterCountriesBySearch, saveUserList } from '../../redux';
import SideBarShadow from '../sidebar/SideBarShadow';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import DetailsSkeleton from '../skeleton/DetailsSkeleton';
import { Loader } from '../loader/Loader';

// Create Details page component component
const Details = () => {
  // Declare react  react states and redux states
  const { CountryName } = useParams();
  const dispatch = useDispatch();
  const ActiveTheme = useSelector((state) => state.ActiveTheme);
  const getCountriesBySearch = useSelector((state) => state.getCountriesBySearch);
  const SaveUserListResponse = useSelector((state) => state.SaveUserListResponse);
  const [WaitingLoader, setWaitingLoader] = useState(false);
  const [Result, setResult] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [ResultStatus, setResultStatus] = useState('loading');

  // Effect to trigger redux function which fetch country match the name when window reload
  useEffect(() => {
    dispatch(filterCountriesBySearch(CountryName));
  }, []);

  // Effect which listen and change react state according to the response from api
  useEffect(() => {
    if (getCountriesBySearch.success === true) {
      setResult(getCountriesBySearch.informations);
      setResultStatus('success');
      const obj = getCountriesBySearch.informations[0].languages;
      const newObj = Object.values(Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v])));
      setLanguages(newObj);
    } else {
      setResultStatus('error');
    }
  }, [getCountriesBySearch]);

  useEffect(() => {
    if (SaveUserListResponse.success === true) {
      setWaitingLoader(false);
    } else {
      setWaitingLoader(false);
    }
  }, [SaveUserListResponse]);

  const HandleSaveList = (item) => {
    setWaitingLoader(true);
    const info = { country: item };
    dispatch(saveUserList(info));
  };

  return (
  // In Jsx we first check if have data from api and with react state and then diplay page according to response status

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
        <div />
        { ResultStatus === 'success' ? Result.map((el) => (
          <div className="details-container">
            <div className="details-wrapper1">
              <img src={el.flags.png} alt=" " />
            </div>

            <div className="details-wrapper2">
              <h3 style={{ color: `${ActiveTheme.ModeTextColor}` }}>{el.name.common}</h3>
              <div className="details-wrapper2-first-div">
                <div className="details-wrapper2-child">
                  <div>
                    <h4 style={{ color: `${ActiveTheme.ModeTextColor}` }}>Native Name :</h4>
                    <p>
                      {el.name.official }
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: `${ActiveTheme.ModeTextColor}` }}>Population :</h4>
                    <p>{el.population }</p>
                  </div>
                  <div>
                    <h4 style={{ color: `${ActiveTheme.ModeTextColor}` }}>Region :</h4>
                    <p>{ el.region}</p>
                  </div>
                  <div>
                    <h4 style={{ color: `${ActiveTheme.ModeTextColor}` }}>Sub Region :</h4>
                    <p>{ el.subregion}</p>
                  </div>
                  <div>
                    <h4 style={{ color: `${ActiveTheme.ModeTextColor}` }}>Capital :</h4>
                    <p>{ el.capital}</p>
                  </div>

                </div>
                <div className="details-wrapper2-child">
                  <div>
                    <h4 style={{ color: `${ActiveTheme.ModeTextColor}` }}>Top Level Domain :</h4>
                    {el.tld.map((domain) => (<p key={uuidv4()}>{ domain}</p>))}

                  </div>
                  <div>
                    <h4 style={{ color: `${ActiveTheme.ModeTextColor}` }}>Currencies :</h4>
                    <p>
                      {Object.keys(el.currencies)}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: `${ActiveTheme.ModeTextColor}` }}>Capital :</h4>
                    <p>{ el.startOfWeek}</p>
                  </div>
                  <div>
                    <h4 style={{ color: `${ActiveTheme.ModeTextColor}` }}>Languages :</h4>
                    {Languages.length > 0 && (Languages.map((lang) => (
                      <p key={uuidv4()}>
                        { lang}
                        ,
                      </p>
                    )))}
                  </div>
                </div>
              </div>
              <div className="details-wrapper2-second-div">
                <h4 style={{ color: `${ActiveTheme.ModeTextColor}` }}>Border Countries :</h4>
                <div>
                  {el.borders ? el.borders.map((res) => (
                    <button type="button" key={uuidv4()} style={{ color: `${ActiveTheme.ModeTextColor}` }}>{ res}</button>
                  )) : <button type="button" key={uuidv4()} style={{ color: `${ActiveTheme.ModeTextColor}` }}>None</button>}
                </div>
              </div>
              <div className="details-wrapper2-third-div">
                <button type="button" style={{ color: `${ActiveTheme.ModeTextColor}` }} onClick={() => HandleSaveList(el)}>Save to My List</button>
              </div>
            </div>

          </div>
        )) : <DetailsSkeleton />}
      </div>
      {WaitingLoader && (
      <div className="mylist-loader-wrapper" style={{ backgroundColor: `${ActiveTheme.LoaderColor}` }}>
        <Loader />
      </div>
      )}
    </div>
  );
};

export default Details;
