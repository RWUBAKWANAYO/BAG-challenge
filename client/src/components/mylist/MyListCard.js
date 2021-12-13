/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Import all necessary libraries and components for this component

import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserList, handlePath } from '../../redux';
import LandingSkeleton from '../skeleton/LandingSkeleton';

// Create landing page cards component and destucture data from parent as props
const LandingCard = ({ ActiveTheme }) => {
  // Declare react libraries, react states and redux states
  const dispatch = useDispatch();
  const history = useHistory();
  const GetUserListResponse = useSelector((state) => state.GetUserListResponse);
  const [Result, setResult] = useState([]);
  const [ResultStatus, setResultStatus] = useState('loading');

  // Create Effects which will trigger redux function to fetch data when window reload
  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  // Create Effects which will listen to redux states in case api return return response and change react state according to response from api
  useEffect(() => {
    if (GetUserListResponse.success === true) {
      if (GetUserListResponse.response.data.length > 0) {
        setResult(GetUserListResponse.response.data);
        setResultStatus('success');
      }
      if (GetUserListResponse.response.data.length <= 0) {
        setResultStatus('null');
      }
    } else {
      setResultStatus('error');
    }
  }, [GetUserListResponse]);

  // Create function which will handle navigation when card clicked
  // this function also trigger redux function which change navbar and display go back link
  const HandleLink = (CountryName) => {
    dispatch(handlePath(`/details/${CountryName}`));
    history.push(`/details/${CountryName}`);
  };

  return (
    // In Jsx we first check if have data from api and with react state and then diplay page according to response status
    <div className="landing-wrapper2">
      {ResultStatus === 'success'
        ? Result.map((el) => (
          <div
            className="country-card"
            key={uuidv4()}
            onClick={() => HandleLink(el.country.name.common)}
          >
            {console.log(el)}
            <img src={el.country.flags.png} alt=" " />
            <h3 disabled style={{ color: `${ActiveTheme.ModeTextColor}` }}>
              {el.country.name.common}
            </h3>
            <p>
              Population :
              {el.country.population}
            </p>
            <p>
              Capital :
              {el.country.capital}
            </p>
            <p>
              Currency :
              {el.country.currencies !== undefined ? (
                <>{Object.keys(el.country.currencies)[0]}</>
              ) : (
                <>None</>
              )}
            </p>
            <div>
              <span>
                <Icon.Trash2 className="delete-icon" size={16} />
              </span>
              <span>
                <Icon.Check className="check-icon" size={16} />
              </span>
            </div>
          </div>
        )) : (ResultStatus === 'null' ? (<h1 className="no-data-header" style={{ color: `${ActiveTheme.ModeTextColor}` }}>You have no saved data yet</h1>) : <LandingSkeleton />)}
      {console.log(ResultStatus)}
    </div>
  );
};

export default LandingCard;
