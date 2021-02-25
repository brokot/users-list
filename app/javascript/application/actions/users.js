import axios from 'axios';

export const SET_LOADING = 'SET_LOADING';
export const SET_SAVING = 'SET_SAVING';
export const SET_USER = 'SET_USER';
export const SET_USER_ATTRIBUTE = 'SET_USER_ATTRIBUTE';
export const SET_USERS = 'SET_USERS';

export function onSetLoading(loading) {
  return {
    type: SET_LOADING,
    loading,
  };
}

export function onSetSaving(saving) {
  return {
    type: SET_SAVING,
    saving,
  };
}

export function onSetUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function onSetUserAttribute(key, value) {
  return {
    type: SET_USER_ATTRIBUTE,
    key,
    value,
  };
}

export function onSetUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function loadUser(id) {
  return (dispatch) => {
    dispatch(onSetSaving(true));
    dispatch(onSetUser({ id }));
    axios.get(`/users/${id}`).then((response) => {
      const { data } = response;
      dispatch(onSetUser(data.user));
      dispatch(onSetSaving(false));
    }).catch((error) => {
      dispatch(onSetUser(null));
      dispatch(onSetSaving(false));
      console.log(error);
    });
  }
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