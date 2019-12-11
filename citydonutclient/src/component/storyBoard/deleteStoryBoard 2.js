import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export class DeleteStoryBoard extends React.Component {
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

    handleDelete = () => {
        axios.get(`http://localhost:8091/api/v1/gallery/${this.props.storyBoard.galleryDto.id}/`,
            { withCredentials: true }).then((response) => {
            Array.from(response.data).forEach((data) => {
                axios.delete(`${data.fileDownloadUri}`, { withCredentials: true });
            });
        });
        axios.delete('http://localhost:8091/api/v1/project/'
            + `${this.props.storyBoard.projectId}/storyboard/${this.props.storyBoard.id}`,
        { withCredentials: true })
            .then(axios.delete(`http://localhost:8091/api/v1/gallery/${this.props.storyBoard.galleryDto.id}`,
                { withCredentials: true })).then(this.props.resetStoryBoards);
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
                    видалити
                </Button>
                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Ви справді хочете видалити допис? Цю дію неможливо скасувати.
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Скасувати
                        </Button>
                        <Button variant="primary" onClick={this.handleDelete}>
                            Видалити
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
