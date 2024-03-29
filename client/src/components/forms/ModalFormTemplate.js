import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Form, Button, Alert } from 'reactstrap';

class ModalFormTemplate extends Component {
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
        <ModalBody>
          {this.props.msg ? (
            <Alert color="danger">{this.props.msg}</Alert>
          ) : null}
          {this.props.msg2 ? <p>{this.props.msg2}</p> : null}
          <Form onSubmit={this.props.onSubmit}>
            {this.props.renderFields()}
            <Button
              color="primary"
              style={{ marginTop: '2rem' }}
              className="float-right"
              disabled={this.props.disabled}
            >
              {this.props.primaryAction}
            </Button>
          </Form>
          <Button
            color="secondary"
            style={{ marginTop: '2rem', marginRight: '0.5rem' }}
            className="float-right"
            onClick={this.props.toggle}
          >
            {this.props.secondaryAction}
          </Button>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalFormTemplate;
