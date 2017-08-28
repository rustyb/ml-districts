import fetch from 'isomorphic-fetch';
import * as actions from './action-types';
import config from '../config';
// import { generateCountryStats, generateUserStats } from '../lib/generateStats';

// ////////////////////////////////////////////////////////////////
//                           DISTRICTS                           //
// ////////////////////////////////////////////////////////////////

function requestDistricts () {
  return {
    type: actions.REQUEST_DISTRICTS
  };
}

function recieveDistricts (json) {
  return {
    type: actions.RECIEVE_DISTRICTS,
    json: json,
    receivedAt: Date.now()
  };
}

export function fetchDistricts () {
  return (dispatch) => {
    dispatch(requestDistricts());
    let url = `${config.api}/districts-u?date_from=2017-07-24`;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(recieveDistricts(json));
      });
  };
}
