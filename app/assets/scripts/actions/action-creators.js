import fetch from 'isomorphic-fetch';
import * as actions from './action-types';
import config from '../config';
import moment from 'moment';
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

export function fetchDistricts (dateFrom) {
  return (dispatch) => {
    dispatch(requestDistricts());
    let from_date = dateFrom || moment().subtract(10, 'days').format('YYYY-MM-DD')
    let url = `${config.api}/districts-u?date_from=${from_date}`;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(recieveDistricts(json));
      });
  };
}
