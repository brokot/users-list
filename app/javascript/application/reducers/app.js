import immutableUpdate from 'react-addons-update';
import {
  SET_PAGINATION_DATA,
} from '../actions/app.js';

const initialState = {
  paginationData: {},
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case SET_PAGINATION_DATA:
      return immutableUpdate(state, {
        paginationData: {$set: {...state.paginationData, ...action.data}}
      });
    default:
      return state;
  }
};