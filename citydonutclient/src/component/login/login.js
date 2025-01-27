import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import axios from '../../utils/services';

export class Login extends React.Component {
    state = {
        userEmail: undefined,
        password: undefined,
        status: undefined,
        errorMessage: undefined,
    };

    setEmail = (email) => {
        this.setState({ userEmail: email.target.value });
    };

    setPassword = (pass) => {
        this.setState({ password: pass.target.value });
    };

    insertLoginData = () => {
        const data = {
            userEmail: this.state.userEmail,
            password: this.state.password,
        };

        axios.post('http://localhost:8091/api/v1/sign-in',
            data,
            { withCredentials: true })
            .then((response) => {
                this.setState({
                    status: response.status,
                });
            })
            .catch((err) => {
                this.setState({ errorMessage: err.data.message });
            });
    };

    isEmptyField = () => this.state.userEmail !== undefined && this.state.userEmail !== ''
            && this.state.password !== undefined && this.state.password !== '';

    toRedirect = () => this.state.status === 200 && window.location.replace('http://localhost:3000/');

    render() {
        return (
            <Modal.Dialog style={{ width: '400px', height: '400px' }}>
                <Modal.Header>
                    <Modal.Title style={{ textAlign: 'center' }}>Вхід</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="col-8">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                required
                                type="userEmail"
                                placeholder="Введіть ваш email"
                                onChange={this.setEmail}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-8">
                        <Form.Group controlId="formPlaintextPassword">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Введіть ваш пароль"
                                onChange={this.setPassword}
                            />
                        </Form.Group>
                    </div>

                    <div>
                        {
                            !this.isEmptyField()
                            && <div className="alert alert-primary" role="alert">Всі поля повинні бути заповненими</div>
                        }
                        {
                            this.state.errorMessage
                            && <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="lg" onClick={this.insertLoginData}>Увійти</Button>
                    <Button as={Link} to="/registration" className="btn btn-success" size="lg">Реєстрація</Button>
                </Modal.Footer>
                <div>
                    <div>
                        <div className="d-flex flex-column">
                            <ButtonGroup size="lg">
                                <Button href="http://localhost:8091/api/v1/facebooklogin">Login with Facebook</Button>
                                <Button href="http://localhost:8091/api/v1/googlelogin">Login with Google</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>

                <div>
                    {' '}
                    {this.toRedirect()}
                </div>
            </Modal.Dialog>
        );
    }
}

export default Login;
