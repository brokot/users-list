import React, { Component } from 'react';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';
import UsersApp from './users_app.js';
import PolarisWrapper from '../../application/components/common/polaris_wrapper.js.jsx';

class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.store = typeof window.store === 'undefined' ? configureStore() : window.store;
  }

  render() {
    return (
      <div>
        <Provider store={this.store}>
          <PolarisWrapper>
            <UsersApp />
          </PolarisWrapper>
        </Provider>
      </div>
  );
  }
}

export default UsersContainer;
