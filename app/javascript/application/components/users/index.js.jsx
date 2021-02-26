import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Badge,
  Card,
  DataTable,
  Frame,
  Page,
  Toast,
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

  onSaveUser() {
    this.props.actions.onSaveUser(this.userParams(), () => {
      this.loadUsers(this.paginationParams());
    });
  }

  loadUsers(params) {
    this.props.actions.loadUsers(params, (data) => {
      this.props.actions.onSetPaginationData(data.meta);
    });
  }

  userParams() {
    const { user } = this.props;
    return {...this.blankUser(), ...user, errors: null};
  }

  blankUser() {
    return({
      name: '',
      email: '',
      phone: '',
    })
  }

  headers() {
    return(
      ['Last updated', 'Name', 'Email', 'Title', 'Phone', 'Status', '']
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
        this.lastUpdated(user.updated_at),
        user.name,
        user.email,
        user.title,
        user.phone,
        this.userStatus(user.status),
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

  lastUpdated(updatedAt) {
    const date = new Date(updatedAt);
    return date.toUTCString();
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
    const { actions, deleting, loading, message, saving, user } = this.props;

    return (
      <Frame>
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
            onSave={this.onSaveUser.bind(this)}
            onCancel={() => { actions.onSetUser(null) }}
          />
          {message.content && <Toast
            error={message.error}
            content={message.content}
            onDismiss={() => actions.onSetMessage()} />}
        </Page>
      </Frame>
    );
  }
}

export default UsersList;
