import axios from 'axios';

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

export function loadUsers(params, success) {
  return (dispatch) => {
    dispatch(onSetLoading(true));
    axios.get('/users', { params }).then((response) => {
      const { data } = response;
      dispatch(onSetUsers(data.users));
      dispatch(onSetLoading(false));
      success && success(data);
    }).catch((error) => {
      console.log(error);
      dispatch(onSetLoading(false));
    });
  }
}

export function onDeleteUser(id, success) {
  return (dispatch) => {
    axios.delete(
      `/users/${id}`,
      { headers: window.axiosDefaultHeaders }
    ).then((response) => {
      success && success(response);
    }).catch((error) => {
      console.log(error);
    });
  }
}