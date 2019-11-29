import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export class NewStoryBoard extends React.Component {
    state = {
        show: false,
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    handleClose = () => {
        this.setState({
            show: false,
        });
    };

    handleSend = () => {

    };

    render() {
        return (
            <div>
                <Button onClick={this.handleShow}>Новий допис</Button>
                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Новий допис</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    Фото:
                                </Form.Label>

                                <Form.Control id="fileInput" type="file" multiple="multiple" accept=".jpeg,.jpg,.tif,.png" />
                                <Form.Label>
                                    Опис:
                                </Form.Label>
                                <Form.Control id="descriptionInput" as="textarea" maxlength="1000" rows="5" />
                                <p className="text-muted">
                                    Поле не може містити більше, ніж 1000 символів
                                </p>
                                <Form.Label>
                                    Сума витрачених коштів:
                                </Form.Label>
                                <Form.Control id="moneyInput" min="0" type="number" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Скасувати
                        </Button>
                        <Button variant="primary" onClick={this.handleSend}>
                            Надіслати
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
