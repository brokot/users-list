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
  onSaveUser,
} from '../actions/users.js';

import {
  onSetFilterData,
  onSetMessage,
  onSetPaginationData,
} from '../actions/app.js';

function mapStateToProps(state) {
  return {
    deleting: state.app.deleting,
    filterData: state.app.filterData,
    loading: state.app.loading,
    message: state.app.message,
    paginationData: state.app.paginationData,
    saving: state.app.saving,
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
        onSaveUser,
        onSetFilterData,
        onSetMessage,
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
