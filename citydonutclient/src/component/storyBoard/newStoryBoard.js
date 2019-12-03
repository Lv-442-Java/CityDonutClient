import React from 'react';
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
        const body = {
            description: document.getElementById('descriptionInput').value,
            moneySpent: document.getElementById('moneyInput').value,
        };
        const { files } = document.getElementById('fileInput');
        if (body.description === '') {
            alert("Поле опису є обов'язковим для заповнення");
            return;
        }
        axios.post(`http://localhost:8091/api/v1/project/${this.props.projectId}/storyboard`,
            body, { withCredentials: true }).then((response) => {
            if (files.length !== 0) {
                axios.get(`http://localhost:8091/api/v1/storyboard/${response.data.id}/gallery`,
                    { withCredentials: true }).then((response) => {
                    const fileData = new FormData();
                    Array.from(files).forEach((file, i) => {
                        fileData.append('files', file);
                    });
                    axios.post(`http://localhost:8091/api/v1/gallery/${response.data}/`,
                        fileData, { withCredentials: true });
                });
            }
        });

        this.handleClose();
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

                                <Form.Control
                                    id="fileInput"
                                    type="file"
                                    multiple="multiple"
                                    accept=".jpeg,.jpg,.tif,.png"
                                    enctype="multipart/form-data"
                                />
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
