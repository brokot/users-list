import immutableUpdate from 'react-addons-update';
import {
  SET_USERS,
} from '../actions/users.js';

const initialState = {
  users: [],
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return immutableUpdate(state, {
        users: {$set: action.users}
      });
    default:
      return state;
  }
};
