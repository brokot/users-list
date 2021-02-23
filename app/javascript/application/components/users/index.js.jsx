import React, { Component } from 'react';
import {
  Badge,
  Card,
  DataTable,
  Page,
} from '@shopify/polaris';
import IndexSpinner from '../common/index_spinner.js.jsx';
import axios from 'axios';

class UsersList extends Component {
  componentDidMount() {
    this.loadUsers({});
  }

  loadUsers(params) {
    this.props.actions.onSetLoading(true);
    axios.get('/users', { params: params })
      .then((response) => { this.onLoadUsers(response.data) })
      .catch((error) => { this.onFail(error) });
  }

  onLoadUsers(data) {
    this.props.actions.onSetUsers(data.users);
    this.props.actions.onSetLoading(false);
  }

  onFail(error) {
    console.log(error);
    this.props.actions.onSetLoading(false);
  }

  headers() {
    return(
      ['Name', 'Email', 'Title', 'Phone', 'Status', 'Last updated', '']
    );
  }

  contentType() {
    return(
      ['Text', 'Text', 'Text', 'Text', 'Text', 'Text', 'Text']
    );
  }

  rows() {
    const { users } = this.props;
    return users.map((user) => {
      return [
        user.name,
        user.email,
        user.title,
        user.phone,
        this.userStatus(user.status),
        user.updated_at,
        ''
      ];
    });
  }

  userStatus(status) {
    return(
      <Badge status={status === 'inactive' ? 'critical' : 'success'}>{status}</Badge>
    );
  }

  render() {
    const {
      loading,
    } = this.props;

    return (
      <Page
        title="Users"
      >
        <Card>
          <Card.Section>
            <div style={{position: 'relative', minHeight: '80px'}}>
              {loading && <IndexSpinner />}
              <DataTable
                columnContentTypes={this.contentType()}
                headings={this.headers()}
                rows={this.rows()}
              />
            </div>
          </Card.Section>
        </Card>
      </Page>
    );
  }
}

export default UsersList;
