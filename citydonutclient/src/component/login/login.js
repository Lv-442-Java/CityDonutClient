import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export class Login extends React.Component {
    state = {
        "userEmail": undefined,
        "password": undefined
    };

    setEmail = (e) => {
        this.setState({email: e.target.value});
    };

    setPassword = (e) => {
        this.setState({password: e.target.value});
    };

    insertLoginData = () => {
        let data = {
            userEmail: this.state.email,
            password: this.state.password
        };
        console.log(data);
        axios.post(`http://localhost:8080/sign-in`,
            data,
            {withCredentials: true}).then(response => console.log(response.data)).catch(err => {
            console.log(err);
            let data = err.response.data;
            let errors = JSON.parse(data.message);
            this.setState({...errors})
            console.log(errors);
        })
    };

    render() {
        console.log(this.state)
        return (

            <Modal.Dialog style={{width: '400px', height: '400px'}}>
                <Modal.Header>
                    <Modal.Title style={{textAlign: 'center'}}>Вхід</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="col-8">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Введіть ваш email" onChange={this.setEmail}/>
                        </Form.Group>
                    </div>

                    <div className="col-8">
                        <Form.Group controlId="formPlaintextPassword">
                            <Form.Control type="password" placeholder="Введіть ваш пароль" onChange={this.setPassword}/>
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button href="http://localhost:3000/registration" variant="secondary" size="lg">Register</Button>
                    <Button className="btn btn-success" variant="primary" onClick={this.insertLoginData}
                            size="lg">Login</Button>
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
