import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Badge,
  Card,
  DataTable,
  Page,
} from '@shopify/polaris';
import IndexSpinner from '../common/index_spinner.js.jsx';
import Paginator from '../common/paginator.js.jsx';

class UsersList extends Component {
  componentDidMount() {
    this.loadUsers(this.paginationParams());
  }

  handleDelete(id) {
    this.props.actions.onDeleteUser(id, () => {
      this.loadUsers(this.paginationParams());
    });
  }

  loadUsers(params) {
    this.props.actions.loadUsers(params, (data) => {
      this.props.actions.onSetPaginationData(data.meta);
    });
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
        this.userActions(user),
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

  userActions(user) {
    return (
      <div style={{ minWidth: '150px' }}>
        <ButtonGroup>
          <Button size="slim" onClick={() => {}}>Edit</Button>
          <Button size="slim" destructive onClick={() => { this.handleDelete(user.id) }}>Delete</Button>
        </ButtonGroup>
      </div>
    );
  }

  userStatus(status) {
    return(
      <Badge status={status === 'inactive' ? 'critical' : 'success'}>{status}</Badge>
    );
  }

  changePage(page) {
    this.props.actions.onSetPaginationData({ page });
    this.loadUsers({...this.paginationParams(), page });
  }

  paginationParams() {
    const { paginationData } = this.props;

    return {
      page: paginationData.page,
      limit: paginationData.limit,
    }
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
