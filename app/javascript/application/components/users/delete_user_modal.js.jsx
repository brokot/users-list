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
    }
  }

  componentDidMount() {
    this.props.getOpenFn && this.props.getOpenFn(this.setUserId.bind(this));
  }

  setUserId(id) {
    this.setState({ id });
  }

  onConfirmDeleting() {
    this.props.onDelete(this.state.id, () => {
      this.setState({ id: null });
    });
  }

  onCancelDeleting() {
    this.setUserId(null);
  }
  
  render() {
    const { id } = this.state;
    const { loading } = this.props;

    return (
      <Modal
        open={id}
        loading={loading}
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
