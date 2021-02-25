import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Badge,
  Card,
  DataTable,
  Page,
} from '@shopify/polaris';
import DeletingUserModal from './delete_user_modal.js.jsx';
import IndexSpinner from '../common/index_spinner.js.jsx';
import Paginator from '../common/paginator.js.jsx';
import UserFormModal from './user_form_modal.js.jsx';

class UsersList extends Component {
  componentDidMount() {
    this.loadUsers(this.paginationParams());
  }

  onDeleteUser(id, callback) {
    this.props.actions.onDeleteUser(id, () => {
      callback && callback();
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
          <Button size="slim" onClick={() => { this.props.actions.loadUser(user.id) }}>Edit</Button>
          <Button size="slim" destructive onClick={() => { this.setUserOnDelete(user.id) }}>Delete</Button>
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
    const { actions, deleting, loading, saving, user } = this.props;

    return (
      <Page
        title="Users"
        primaryAction={{
          content: 'Create user',
          onAction: () => { actions.onSetUser({}) }
        }}
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
        <DeletingUserModal
          getOpenFn={(openFn) => { this.setUserOnDelete = openFn }}
          loading={deleting}
          onDelete={this.onDeleteUser.bind(this)}
        />
        <UserFormModal
          user={user}
          loading={saving}
          onChange={actions.onSetUserAttribute}
          onSave={actions.onSaveUser}
          onCancel={() => { actions.onSetUser(null) }}
        />
      </Page>
    );
  }
}

export default UsersList;
