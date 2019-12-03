import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export class UpdateStoryBoard extends React.Component {
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
        const newStoryBoard = this.props.storyBoard;
        newStoryBoard.description = document.getElementById('descriptionInput').value;
        newStoryBoard.moneySpent = document.getElementById('moneyInput').value;
        newStoryBoard.verified = false;
        if (newStoryBoard.description === '') {
            alert("Поле опису є обов'язковим для заповнення");
            return;
        }
        axios.put(
            `http://localhost:8091/api/v1/project/${this.props.storyBoard.projectId}/storyboard`,
            newStoryBoard, { withCredentials: true },
        ).then(this.props.resetStoryBoards);
        axios.get(`http://localhost:8091/api/v1/gallery/${this.props.storyBoard.galleryDto.id}/`,
            { withCredentials: true }).then((response) => {
            response.data.foreach((data) => {
                axios.delete(`${data.fileDownloadUri}`, { withCredentials: true });
            });
        });
        const { files } = document.getElementById('fileInput');
        if (files.length !== 0) {
            axios.get(`http://localhost:8091/api/v1/storyboard/${this.props.storyBoard.id}/gallery`,
                { withCredentials: true }).then((response) => {
                const fileData = new FormData();
                Array.from(files).forEach((file, i) => {
                    fileData.append('files', file);
                });
                axios.post(`http://localhost:8091/api/v1/gallery/${this.props.storyBoard.galleryDto.id}/`,
                    fileData, { withCredentials: true });
            });
        }
        this.handleClose();
    };

    render() {
        return (
            <div>
                <Button
                    variant="secondary"
                    style={{ 'font-size': '10px', 'margin-right': '0.3rem' }}
                    onClick={this.handleShow}
                >
редагувати
                </Button>
                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редагувати допис</Modal.Title>
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
                                    files={this.props.photos}
                                />
                                <Form.Label>
                                    Опис:
                                </Form.Label>
                                <Form.Control
                                    id="descriptionInput"
                                    as="textarea"
                                    maxlength="1000"
                                    rows="5"
                                    defaultValue={this.props.storyBoard.description}
                                />
                                <p className="text-muted">
                                    Поле не може містити більше, ніж 1000 символів
                                </p>
                                <Form.Label>
                                    Сума витрачених коштів:
                                </Form.Label>
                                <Form.Control
                                    id="moneyInput"
                                    min="0"
                                    type="number"
                                    defaultValue={this.props.storyBoard.moneySpent}
                                />
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
