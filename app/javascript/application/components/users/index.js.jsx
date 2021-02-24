import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Badge,
  Card,
  DataTable,
  Modal,
  Page,
  TextContainer,
} from '@shopify/polaris';
import IndexSpinner from '../common/index_spinner.js.jsx';
import Paginator from '../common/paginator.js.jsx';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userIdOnDelete: null,
      deleting: false,
    }
  }

  componentDidMount() {
    this.loadUsers(this.paginationParams());
  }

  handleDelete(id) {
    this.setState({ userIdOnDelete: id });
  }

  onConfirmDeleting() {
    this.setState({ deleting: true });
    this.props.actions.onDeleteUser(this.state.userIdOnDelete, () => {
      this.setState({ userIdOnDelete: null, deleting: false });
      this.loadUsers(this.paginationParams());
    });
  }

  onCancelDeleting() {
    this.setState({ userIdOnDelete: null });
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
    const {
      deleting,
      userIdOnDelete,
    } = this.state;

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
        <Modal
          open={userIdOnDelete}
          onClose={this.onCancelDeleting.bind(this)}
          title="Delete user"
          primaryAction={{
            content: 'Confirm',
            disabled: deleting,
            loading: deleting,
            onAction: this.onConfirmDeleting.bind(this),
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              disabled: deleting,
              loading: deleting,
              onAction: this.onCancelDeleting.bind(this),
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Are you sure you want to delete this user
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </Page>
    );
  }
}

export default UsersList;
