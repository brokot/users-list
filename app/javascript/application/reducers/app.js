import immutableUpdate from 'react-addons-update';
import {
  SET_DELETING,
  SET_LOADING,
  SET_PAGINATION_DATA,
  SET_SAVING,
} from '../actions/app.js';

const initialState = {
  deleting: false,
  loading: false,
  paginationData: {},
  saving: false,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case SET_DELETING:
      return immutableUpdate(state, {
        deleting: {$set: action.deleting}
      });
    case SET_LOADING:
      return immutableUpdate(state, {
        loading: {$set: action.loading}
      });
    case SET_PAGINATION_DATA:
      return immutableUpdate(state, {
        paginationData: {$set: {...state.paginationData, ...action.data}}
      });
    case SET_SAVING:
      return immutableUpdate(state, {
        saving: {$set: action.saving}
      });
    default:
      return state;
  }
};