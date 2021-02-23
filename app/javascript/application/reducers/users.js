import immutableUpdate from 'react-addons-update';
import {
  SET_LOADING,
  SET_USERS,
} from '../actions/users.js';

const initialState = {
  users: [],
  loading: false,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return immutableUpdate(state, {
        loading: {$set: action.loading}
      });
    case SET_USERS:
      return immutableUpdate(state, {
        users: {$set: action.users}
      });
    default:
      return state;
  }
};
