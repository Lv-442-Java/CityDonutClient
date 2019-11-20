import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import axios from "axios"

export default class MyModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            sum: undefined
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    setSum = (e) => {
        this.setState({sum: e.target.value})
    };

    sendDonate = () => {
        let data = {
            sum: this.state.sum,
            projectId: this.props.projectId,
        };
        axios.post(`http://localhost:8091/api/v1/donates/`, data, {withCredentials: true}).then(
            this.handleClose
        )
    };

    // isValid = () => {
    //     if (isF this.state.sum)
    // };

    render() {
        console.log(this.state.sum)
        return (
            <>
                <Button variant="primary" style={{margin:"17px", height:"45px", width:"125px"}} onClick={this.handleShow}>
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
                                    Введіть суму донату:
                                </Form.Label>
                                <Form.Control isValid={this.isValid} onChange={this.setSum}>

                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.sendDonate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
