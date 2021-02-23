import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UsersList from '../components/users/index.js.jsx';

import {
  onSetLoading,
  onSetUsers,
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
        onSetLoading,
        onSetPaginationData,
        onSetUsers,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersList);
