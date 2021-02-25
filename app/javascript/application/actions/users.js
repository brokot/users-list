import axios from 'axios';
import {
  onSetDeleting,
  onSetLoading,
  onSetMessage,
  onSetSaving
} from './app.js';

export const SET_USER = 'SET_USER';
export const SET_USER_ATTRIBUTE = 'SET_USER_ATTRIBUTE';
export const SET_USERS = 'SET_USERS';

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
      dispatch(onSetMessage("User can't be loaded", true));
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
      dispatch(onSetLoading(false));
      dispatch(onSetMessage("Users can't be loaded", true));
    });
  }
}

export function onDeleteUser(id, success) {
  return (dispatch) => {
    dispatch(onSetDeleting(true));
    axios.delete(
      `/users/${id}`,
      { headers: window.axiosDefaultHeaders }
    ).then((response) => {
      dispatch(onSetDeleting(false));
      success && success(response);
    }).catch((error) => {
      dispatch(onSetDeleting(false));
      dispatch(onSetMessage("User can't be deleted", true));
    });
  }
}

export function onSaveUser(user, success) {
  return (dispatch) => {
    const method = user.id ? 'PUT' : 'POST';
    const url = user.id ? `/users/${user.id}` : '/users';
    dispatch(onSetSaving(true));
    axios({
      method: method,
      url: url,
      data: { user: user },
      headers: window.axiosDefaultHeaders
    }).then((response) => {
      dispatch(onSetUser(null));
      dispatch(onSetSaving(false));
      success && success(response);
    }).catch((error) => {
      dispatch(onSetSaving(false));
      if (error.response) dispatch(onSetUserAttribute('errors', error.response.data));
      dispatch(onSetMessage("User can't be saved", true));
    });
  }
}
