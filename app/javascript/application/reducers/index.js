import { combineReducers } from 'redux';
import app from './app.js';
import users from './users.js';

const rootReducer = combineReducers({
  app,
  users,
});

export default rootReducer;
