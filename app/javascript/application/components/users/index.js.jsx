import React, { Component } from 'react';
import {
  Badge,
  Card,
  DataTable,
  Page,
} from '@shopify/polaris';
import IndexSpinner from '../common/index_spinner.js.jsx';
import Paginator from '../common/paginator.js.jsx';
import axios from 'axios';

class UsersList extends Component {
  componentDidMount() {
    const { paginationData } = this.props;
    this.loadUsers({ page: paginationData.page});
  }

  loadUsers(params) {
    this.props.actions.onSetLoading(true);
    axios.get('/users', { params: params })
      .then((response) => { this.onLoadUsers(response.data) })
      .catch((error) => { this.onFail(error) });
  }

  onLoadUsers(data) {
    this.props.actions.onSetUsers(data.users);
    this.props.actions.onSetPaginationData(data.meta);
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

  buildFooter() {
    const { paginationData } = this.props;

    return (
      <Paginator
        totalPages={paginationData.total_pages}
        page={paginationData.page}
        changePage={this.changePage.bind(this)}
      />
    );
  }

  userStatus(status) {
    return(
      <Badge status={status === 'inactive' ? 'critical' : 'success'}>{status}</Badge>
    );
  }

  changePage(page) {
    this.props.actions.onSetPaginationData({ page });
    this.loadUsers({ page });
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
                footerContent={this.buildFooter()}
              />
            </div>
          </Card.Section>
        </Card>
      </Page>
    );
  }
}

export default UsersList;
