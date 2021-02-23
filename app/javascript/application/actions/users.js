export const SET_LOADING = 'SET_LOADING';
export const SET_USERS = 'SET_USERS';

export function onSetLoading(loading) {
  return {
    type: SET_LOADING,
    loading,
  };
}

export function onSetUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}
