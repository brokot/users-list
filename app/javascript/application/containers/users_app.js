import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UsersList from '../components/users/index.js.jsx';

import {
  onSetLoading,
  onSetUsers,
} from '../actions/users.js';

function mapStateToProps(state) {
  return {
    loading: state.users.loading,
    users: state.users.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        onSetLoading,
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
