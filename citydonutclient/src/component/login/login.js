import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Link} from 'react-router-dom';

export class Login extends React.Component {
    state = {
        userEmail: undefined,
        password: undefined,
        status: undefined,
        errorMessage: undefined
    };

    setEmail = (email) => {
        this.setState({userEmail: email.target.value});
    };

    setPassword = (pass) => {
        this.setState({password: pass.target.value});
    };

    insertLoginData = () => {
        let data = {
            userEmail: this.state.userEmail,
            password: this.state.password
        };

        axios.post(`http://localhost:8091/sign-in`,
            data,
            {withCredentials: true})
            .then(response => {
                this.setState({
                    status: response.status
                })
            })
            .catch(err => {
                this.setState({errorMessage: err.response.data["message"]});
                console.log(err.response.data);
            })
    };

    isEmptyField = () => {
        return this.state.userEmail !== undefined && this.state.userEmail !== "" &&
            this.state.password !== undefined && this.state.password !== ""

    };

    toReddirect = () => {
        return this.state.status === 200
    };
    render() {
        return (
            <Modal.Dialog style={{width: '400px', height: '400px'}}>
                <Modal.Header>
                    <Modal.Title style={{textAlign: 'center'}}>Вхід</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="col-8">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control required type="userEmail"
                                          placeholder="Введіть ваш email"
                                          onChange={this.setEmail}/>
                        </Form.Group>
                    </div>

                    <div className="col-8">
                        <Form.Group controlId="formPlaintextPassword">
                            <Form.Control required type="password" placeholder="Введіть ваш пароль"
                                          onChange={this.setPassword}/>
                        </Form.Group>
                    </div>

                    <div>
                        {
                            !this.isEmptyField() &&
                            <div className="alert alert-primary" role="alert">Всі поля повинні бути заповненими</div>
                        }
                        {
                            this.state.errorMessage &&
                            <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button as={Link} to="/registration" size="lg">Реєстрація</Button>
                    <button className="btn btn-success" size="lg" onClick={this.insertLoginData}>Увійти
                    </button>
                </Modal.Footer>
                <div>
                    <div>
                        <div className="d-flex flex-column">
                            <ButtonGroup size="lg">
                                <Button href="http://localhost:8091/facebooklogin">Login with Facebook</Button>
                                <Button href="http://localhost:8091/googlelogin">Login with Google</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>

                <div> {this.toReddirect() && this.props.history.push('/projects')}
                </div>
            </Modal.Dialog>
        )
    }
}

export default Login;
