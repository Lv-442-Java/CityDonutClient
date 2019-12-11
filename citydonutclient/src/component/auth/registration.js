import React from 'react';
import axios from '../../utils/services';
import Form from 'react-bootstrap/Form';

export class Registration extends React.Component {
    state = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        cpassword: undefined,
        status: undefined,
        invalidEmail: undefined,
        dublicationEmail: undefined,
        invalidPassword: undefined,
    };

    setEmail = (e) => {
        this.setState({
            email: e.target.value,
            invalidEmail: undefined,
            dublicationEmail: undefined,
        });
    };

    setPassword = (e) => {
        this.setState({
            password: e.target.value,
            invalidPassword: undefined,
        });
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
            status: 0,
        };

        axios.post('http://localhost:8091/api/v1/registration/',
            data,
            { withCredentials: true })
            .then((response) => {
                this.setState({
                    status: response.status,
                    invalidEmail: undefined,
                    dublicationEmail: undefined,
                    invalidPassword: undefined,
                });
            })
            .catch((err) => {
                const errors = JSON.parse(err.response.data.message);
                // const
                this.setState({ ...errors });
            });
    };

    isValidForm = () => this.state.cpassword === this.state.password
            && this.isEmptyField();

    isEmptyField = () => this.state.firstName !== undefined && this.state.firstName !== ''
            && this.state.lastName !== undefined && this.state.lastName !== ''
            && this.state.email !== undefined && this.state.email !== ''
            && this.state.password !== undefined && this.state.password !== ''
            && this.state.cpassword !== undefined && this.state.cpassword !== '';

    isVisible = () => this.state.status === 200;

    render() {
        return (

            <div align="center">
                <h2>Реєстрація </h2>

                <div className="col-5 ">
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
                        <Form.Control
                            type="email"
                            placeholder="Введіть ваш email"
                            onChange={this.setEmail}
                            isInvalid={!!this.state.invalidEmail || !!this.state.dublicationEmail}
                        />
                        <Form.Control.Feedback type="invalid">
                            {this.state.invalidEmail}
                            {this.state.dublicationEmail}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group controlId="formPlaintextPassword">
                        <Form.Control
                            type="password"
                            placeholder="Введіть ваш пароль"
                            onChange={this.setPassword}
                            isInvalid={!!this.state.invalidPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {this.state.invalidPassword}
                        </Form.Control.Feedback>
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

                <div>
                    {' '}
                    {!this.isEmptyField() && <div className="alert alert-primary" role="alert">Всі поля повинні бути заповненими</div>}
                </div>

                <button
                    className="btn btn-success"
                    onClick={this.insertRegistrationData}
                    disabled={!this.isValidForm()}
                >
Зареєструвати
                </button>

                <div>
                    {' '}
                    {this.isVisible()
                && <div className="alert alert-primary" role="alert">Для активації акаунту перевірте вашу почтову скриньку</div>}
                </div>

            </div>

        );
    }
}
