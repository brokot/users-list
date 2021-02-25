import immutableUpdate from 'react-addons-update';
import {
  SET_LOADING,
  SET_SAVING,
  SET_USER,
  SET_USER_ATTRIBUTE,
  SET_USERS,
} from '../actions/users.js';

const initialState = {
  loading: false,
  saving: false,
  user: null,
  users: [],
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return immutableUpdate(state, {
        loading: {$set: action.loading}
      });
    case SET_SAVING:
      return immutableUpdate(state, {
        saving: {$set: action.saving}
      });
    case SET_USER:
      return immutableUpdate(state, {
        user: {$set: action.user}
      });
    case SET_USER_ATTRIBUTE:
      return immutableUpdate(state, {
        user: {
          [action.key]: {$set: action.value}
        }
      });
    case SET_USERS:
      return immutableUpdate(state, {
        users: {$set: action.users}
      });
    default:
      return state;
  }
};
