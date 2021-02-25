import React, { Component } from 'react';
import {
  FormLayout,
  Modal,
  Select,
  TextField,
} from '@shopify/polaris';

class UserFormModal extends Component {
  error(field) {
    const { user } = this.props;
    if (!user || !user.errors) return null;
    return user.errors[field];
  }

  render() {
    const { loading, user, onCancel, onChange, onSave } = this.props;
    if (!user) return null;

    return (
      <Modal
        loading={loading}
        open={user}
        onClose={onCancel}
        title={`${user.id ? 'Edit' : 'Create'} user`}
        primaryAction={{
          content: 'Save',
          disabled: loading,
          loading: loading,
          onAction: onSave,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            disabled: loading,
            loading: loading,
            onAction: onCancel,
          },
        ]}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              error={this.error('name')}
              label="Name*"
              onChange={(value) => { onChange('name', value)}}
              value={user.name}
            />
            <TextField
              error={this.error('email')}
              type="email"
              label="Email*"
              onChange={(value) => { onChange('email', value)}}
              value={user.email}
            />
            <TextField
              error={this.error('title')}
              label="Title"
              onChange={(value) => { onChange('title', value)}}
              value={user.title}
            />
            <TextField
              error={this.error('phone')}
              label="Phone*"
              onChange={(value) => { onChange('phone', value)}}
              value={user.phone}
            />
            <Select
              label="Status"
              options={[
                {label: 'Active', value: 'active'},
                {label: 'Inactive', value: 'inactive'}
              ]}
              onChange={(value) => { onChange('status', value)}}
              value={user.status}
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );
  }
}

export default UserFormModal;
