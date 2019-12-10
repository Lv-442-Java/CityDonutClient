import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormText from 'react-bootstrap/FormText';
import axios from 'axios';
import { ChangePassword } from './change_password';

export class UserEdit extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        incorrectInputData: {
            firstName: false,
            lastName: false,
            email: false,
        },
        errorMessage: {
            incorrectFirstName: 'Ім\'я повинне містити від 3 до 30 латинських, або україських літер',
            incorrectLastName: 'Прізвище повинне містити від 3 до 30 латинських, або україських літер',
            incorrectEmail: 'Неправильний email',
        },
        firstNameDisabled: true,
        lastNameDisabled: true,
        showChangePassword: false,
    };

    componentDidMount() {
        this.getData();
    }

    handleUserInput = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        this.setState({ [name]: value });
    };

    editAble = () => {
        this.setState({
            firstNameDisabled: !this.state.firstNameDisabled,
            lastNameDisabled: !this.state.lastNameDisabled,
        });
    };

    checkInputPattern = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        if (name === 'firstName') {
            this.setState({
                incorrectInputData: {
                    ...this.state.incorrectInputData,
                    firstName: !this.checkInputValue(value),
                },
            });
        } else if (name === 'lastName') {
            this.setState({
                incorrectInputData: {
                    ...this.state.incorrectInputData,
                    lastName: !this.checkInputValue(value),
                },
            });
        }
    };

    checkInputValue = value => /^[a-zA-Z]{3,30}$/.test(value);

    checkInputValue = value => /^[a-zA-Z]{3,30}$/.test(value);

    canEdit = () => (
        !this.state.incorrectInputData.email
            && !this.state.incorrectInputData.firstName
            && !this.state.incorrectInputData.lastName);

    cancel = () => {
        this.getData().then(
            () => this.setState({
                incorrectInputData: {
                    ...this.state.incorrectInputData,
                    firstName: !this.checkInputValue(this.state.firstName),
                    lastName: !this.checkInputValue(this.state.lastName),
                },
            }),
        );
        this.editAble();
    };

    showChangePassword = () => {
        this.setState({
            showChangePassword: !this.state.showChangePassword,
        });
    };

    getData = () => axios.get('http://localhost:8091/api/v1/user',
        { withCredentials: true })
        .then((response) => {
            this.setState(
                {
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                },
            );
        });

    editUser = () => {
        if (!(this.state.incorrectInputData.firstName
            || this.state.incorrectInputData.lastName
            || this.state.incorrectInputData.email)) {
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
            };
            axios.put('http://localhost:8091/api/v1/user',
                data,
                { withCredentials: true })
                .then((response) => {
                    this.setState(
                        {
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            email: response.data.email,
                        },
                    );
                    this.editAble();
                });
        }
    };

    changeShowChangePassword = () => {
        this.setState({ showChangePassword: false });
    }

    render() {
        const { incorrectInputData, errorMessage } = (this.state);
        return (
            <div className="d-flex justify-content-center" style={{ minHeight: '100vh' }}>
                {this.state.showChangePassword
                && (
                    <div style={{
                        width: '75%',
                    }}
                    >
                        <ChangePassword showChangePassword={this.changeShowChangePassword} />
                    </div>
                )}
                <Form
                    className="d-flex justify-content-around flex-column align-items-center "
                    style={{
                        width: '40%',
                        backgroundColor: '',
                        paddingTop: '70px',
                        paddingBottom: '70px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        borderTopLeftRadius: '15px',
                        borderBottomLeftRadius: '15px',
                        borderColor: '#d2d2d2',
                        borderWidth: '5px',
                        color: 'black',
                        boxShadow: '0 1px 0 #cfcfcf',
                    }}
                >
                    <div><h2>Особисті дані</h2></div>
                    <div
                        className="d-flex flex-column justify-content-around align-items-center"
                        style={{
                            width: '80%',
                            border: '5px solid black',
                            borderRadius: '25px',
                        }}
                    >
                        <FormGroup
                            className="d-flex justify-content-around flex-column align-items-center"
                            controlId="firstName"
                            style={{
                                width: '80%',
                            }}
                        >
                            <FormLabel>Ім&#39;я:</FormLabel>
                            {incorrectInputData.firstName
                            && (
                                <FormText>
                                    <p
                                        style={{
                                            color: 'red',
                                            fontSize: '12px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {errorMessage.incorrectFirstName}
                                    </p>
                                </FormText>
                            )}
                            <FormControl
                                disabled={this.state.firstNameDisabled}
                                name="firstName"
                                value={this.state.firstName}
                                onBlur={this.checkInputPattern}
                                onChange={this.handleUserInput}
                            />
                        </FormGroup>
                        <FormGroup
                            className="d-flex flex-column justify-content-around align-items-center"
                            controlId="lastName"
                            style={{
                                width: '80%',
                            }}
                        >
                            <FormLabel>Прізвище:</FormLabel>
                            {incorrectInputData.lastName
                            && (
                                <FormText>
                                    <p
                                        style={{
                                            color: 'red',
                                            fontSize: '12px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {errorMessage.incorrectLastName}
                                    </p>
                                </FormText>
                            )}
                            <FormControl
                                disabled={this.state.lastNameDisabled}
                                required
                                name="lastName"
                                value={this.state.lastName}
                                onBlur={this.checkInputPattern}
                                onChange={this.handleUserInput}
                            />
                        </FormGroup>
                        <FormGroup
                            className="d-flex flex-column justify-content-around align-items-center"
                            controlId="email"
                            style={{
                                width: '80%',
                            }}
                        >
                            <FormLabel>Email:</FormLabel>
                            {incorrectInputData.email
                            && (
                                <FormText>
                                    <p
                                        style={{
                                            color: 'red',
                                            fontSize: '12px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {errorMessage.incorrectEmail}
                                    </p>
                                </FormText>
                            )}
                            <FormControl
                                disabled
                                name="email"
                                value={this.state.email}
                                onChange={this.handleUserInput}
                            />
                        </FormGroup>
                    </div>
                    {!this.state.showChangePassword
                    && (
                        <div>
                            {this.state.lastNameDisabled
                        && (
                            <Button
                                variant="primary"
                                onClick={this.editAble}
                                style={{
                                    heigth: '15%',
                                    marginTop: '10px',
                                }}
                            >
                            Редагувати
                            </Button>
                        )}
                            {this.state.lastNameDisabled
                        && (
                            <Button
                                variant="primary"
                                onClick={this.showChangePassword}
                                style={{
                                    heigth: '15%',
                                    marginTop: '10px',
                                    marginLeft: '10px',
                                }}
                            >
                            Змінити пароль
                            </Button>
                        )}
                            {!this.state.lastNameDisabled
                        && (
                            <Button
                                variant="primary"
                                onClick={this.cancel}
                                style={{
                                    heigth: '15%',
                                    marginTop: '10px',
                                }}
                            >
                            Відмінити
                            </Button>
                        )}
                            {!this.state.lastNameDisabled && this.canEdit()
                        && (
                            <Button
                                variant="primary"
                                onClick={this.editUser}
                                style={{
                                    heigth: '15%',
                                    marginTop: '10px',
                                    marginLeft: '10px',
                                }}
                            >
                            Зберегти
                            </Button>
                        )}
                        </div>
                    )}
                    {this.state.showChangePassword
                    && (
                        <Button
                            variant="primary"
                            onClick={this.showChangePassword}
                            style={{
                                heigth: '15%',
                                marginTop: '10px',
                            }}
                        >
                        Відмінити
                        </Button>
                    )}
                </Form>
            </div>
        );
    }
}
