import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

export class Registration extends React.Component {
    state = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        cpassword: undefined,
    };

    setEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    setPassword = (e) => {
        this.setState({ password: e.target.value });
    };

    setFirstName = (e) => {
        this.setState({ firstName: e.target.value });
    };

    setLastName = (e) => {
        this.setState({ lastName: e.target.value });
    };

    setConfirmPassword = (e) => {
        this.setState({ cpassword: e.target.value });
    };

    insertRegistrationData = () => {
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        };
        console.log(data);
        axios.post('http://localhost:8080/api/v1/registration/',
            data,
            { crossDomain: true }).then(response => console.log(response.data));
    };

    isValidForm = () => this.state.password !== undefined
            && this.state.cpassword === this.state.password

    render() {
        return (

            <div className="text-center">
                <h2>Реєстрація</h2>

                <div className="col-5">
                    <Form.Group controlId="formForFirstName">
                        <Form.Control type="firstName" placeholder="Введіть ваше ім'я" onChange={this.setFirstName} />
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group controlId="formForLastName">
                        <Form.Control
                            type="lastName"
                            placeholder="Введіть ваше прізвище"
                            onChange={this.setLastName}
                        />
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Введіть ваш email" onChange={this.setEmail} />
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group controlId="formPlaintextPassword">
                        <Form.Control type="password" placeholder="Введіть ваш пароль" onChange={this.setPassword} />
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group controlId="formPlaintextPassword2">
                        <Form.Control
                            type="password"
                            placeholder="Повторіть ваш пароль"
                            onChange={this.setConfirmPassword}
                        />
                    </Form.Group>
                </div>

                <button className="btn btn-success" onClick={this.insertRegistrationData} disabled={!this.isValidForm()}>Register</button>

            </div>

        );
    }
}

export default Registration;
