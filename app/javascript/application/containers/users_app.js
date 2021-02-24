import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UsersList from '../components/users/index.js.jsx';

import {
  loadUsers,
  onDeleteUser,
} from '../actions/users.js';

import {
  onSetPaginationData,
} from '../actions/app.js';

function mapStateToProps(state) {
  return {
    loading: state.users.loading,
    paginationData: state.app.paginationData,
    users: state.users.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loadUsers,
        onDeleteUser,
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
