import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UsersList from '../components/users/index.js.jsx';

import {
  loadUser,
  loadUsers,
  onSetUser,
  onSetUserAttribute,
  onDeleteUser,
} from '../actions/users.js';

import {
  onSetPaginationData,
} from '../actions/app.js';

function mapStateToProps(state) {
  return {
    loading: state.users.loading,
    saving: state.users.saving,
    paginationData: state.app.paginationData,
    user: state.users.user,
    users: state.users.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loadUser,
        loadUsers,
        onDeleteUser,
        onSetUser,
        onSetUserAttribute,
        onSetPaginationData,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);
