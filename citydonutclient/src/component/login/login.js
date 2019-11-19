import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";


export class Login extends React.Component {
    state = {
        userEmail: undefined,
        password: undefined,
        status: undefined
    };

    setEmail = (e) => {
        this.setState({
            userEmail: e.target.value
        });
    };

    setPassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    insertLoginData = () => {
        let data = {
            userEmail: this.state.userEmail,
            password: this.state.password,
            status: 0
        };
        console.log(data);
        axios.post(`http://localhost:8091/api/v1/sign-in`,
            data,
            {withCredentials: true})
            .then(response => {
                this.setState({
                    status: response.status
                })
                console.log(response.data)
            })
            .catch(err => {
                console.log(err);
                let data = err.response.data;
                let errors = JSON.parse(data.message);
                this.setState({...errors})
                console.log(errors);
            })
    };

    isEmptyField = () => {
        return this.state.userEmail !== undefined && this.state.userEmail !== "" &&
            this.state.password !== undefined && this.state.password !== ""
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
                            <Form.Control type="userEmail"
                                          placeholder="Введіть ваш email"
                                          onChange={this.setEmail}
                                          isInvalid={!!this.state.invalidData}/>
                            <Form.Control.Feedback type="invalid">
                                {this.state}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className="col-8">
                        <Form.Group controlId="formPlaintextPassword">
                            <Form.Control type="password" placeholder="Введіть ваш пароль" onChange={this.setPassword}/>
                        </Form.Group>
                    </div>

                    <div> {!this.isEmptyField() &&
                    <div className="alert alert-primary" role="alert">Всі поля повинні бути заповненими</div>}
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    {/*<Button.Item as={Link} to="/registration" >Register</Button.Item>*/}
                    {/*<Button className="btn btn-success" variant="primary" onClick={this.insertLoginData}   disabled={!this.isValidForm()}*/}
                    {/*        size="lg">Login</Button>*/}
                    <button className="btn btn-success" onClick={this.insertLoginData}>Увійти
                    </button>
                </Modal.Footer>
                <div>
                    <div>
                        <div className="d-flex flex-column">
                            <ButtonGroup size="lg">
                                <Button  href="http://localhost:8091/facebooklogin">Login with Facebook</Button>
                                <Button  href="http://localhost:8091/googlelogin">Login with Google</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </Modal.Dialog>
        )
    }
}


export default Login;
