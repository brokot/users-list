export const SET_USERS = 'SET_USERS';

export function onSetUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}