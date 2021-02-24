import React, { Component } from 'react';
import {
  Modal,
  TextContainer,
} from '@shopify/polaris';

class DeletingUserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      loading: false,
    }
  }

  componentDidMount() {
    this.props.getOpenFn && this.props.getOpenFn(this.setUserId.bind(this));
  }

  setUserId(id) {
    this.setState({ id });
  }

  onConfirmDeleting() {
    this.setState({ loading: true });
    this.props.onDelete(this.state.id, () => {
      this.setState({ id: null, loading: false });
    });
  }

  onCancelDeleting() {
    this.setUserId(null);
  }
  
  render() {
    const { id, loading } = this.state;

    return (
      <Modal
        open={id}
        onClose={this.onCancelDeleting.bind(this)}
        title="Delete user"
        primaryAction={{
          content: 'Confirm',
          disabled: loading,
          loading: loading,
          onAction: this.onConfirmDeleting.bind(this),
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            disabled: loading,
            loading: loading,
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
    );
  }
}

export default DeletingUserModal;
