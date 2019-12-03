import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import axios from 'axios';

export default class MyModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            sum: undefined,
            valid: undefined,
        };
    }

    setSum = (e) => {
        this.setState({ sum: e.target.value });
        /^[+]?\d+(\.\d+)?$/.test(e.target.value) ? this.setState({ valid: true }) : this.setState({ valid: false });
    };

    sendDonate = () => {
        const data = {
            sum: this.state.sum,
            projectId: this.props.projectId,
        };
        axios.post('http://localhost:8091/api/v1/donates/', data, { withCredentials: true }).then(
            this.handleClose,
        ).then(
            this.props.getDonatesSum,
        ).then(
            this.props.getContributors,
        );
    };

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({
            show: false,
            valid: undefined,
        });
    }

    render() {
        return (
            <>
                <Button
                    variant="primary"
                    style={{ margin: '17px', height: '45px', width: '125px' }}
                    onClick={this.handleShow}
                >
                    Підтримати
                </Button>

                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Donate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    Введіть суму внеску:
                                </Form.Label>
                                <Form.Control
                                    isValid={this.state.valid}
                                    isInvalid={!this.state.valid}
                                    onChange={this.setSum}
                                >

                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Поле повинне містити лише цифри
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.state.valid && this.sendDonate}>
                            Send
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
