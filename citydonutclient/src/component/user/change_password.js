import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormText from "react-bootstrap/FormText";
import axios from "axios";

export class ChangePassword extends React.Component {

    state = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        incorrectInputData: {
            incorrectOldPassword: false,
            incorrectNewPassword: false,
            incorrectConfirmPassword: false,
            confirmPasswordEqualNewPassword: undefined,
            oldPasswordNotEqualPasswordInDB: false
        },
        inputName: {
            oldPassword: 'oldPassword',
            newPassword: 'newPassword',
            confirmPassword: 'confirmPassword'
        },
        errorMessage: {
            incorrectPasswordPattern: 'Пароль повинен містити від 4 до 15 латинських букв, або цифер',
            passwordsDoNotMatch: 'Паролі не збігаються',
            incorrectOldPassword: 'Не коректний  старий пароль'
        }
    };

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    checkPasswordPattern = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (this.state.inputName.oldPassword === name) {
            this.setState({
                incorrectInputData: {...this.state.incorrectInputData, incorrectOldPassword: !this.checkPassword(value)}
            })
        } else if (this.state.inputName.newPassword === name) {
            this.setState({
                incorrectInputData: {...this.state.incorrectInputData, incorrectNewPassword: !this.checkPassword(value)}
            })
        } else if (this.state.inputName.confirmPassword === name) {
            this.setState({
                incorrectInputData: {
                    ...this.state.incorrectInputData,
                    incorrectConfirmPassword: !this.checkPassword(value)
                }
            })
        }
    };

    checkPassword = (password) => {
        if (password === '') return true;
        return /^[a-zA-Z0-9]{4,15}$/.test(password);
    };

    changePassword = () => {
        if (this.state.newPassword === this.state.confirmPassword) {
            this.setState({
                incorrectInputData: {
                    ...this.state.incorrectInputData,
                    confirmPasswordEqualNewPassword: true
                }
            });
            let data = {
                password: this.state.oldPassword,
                newPassword: this.state.newPassword
            };
            axios.put('http://localhost:8091/api/v1/user/change_password',
                data,
                {withCredentials: true})
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        incorrectInputData: {...this.state.incorrectInputData, oldPasswordNotEqualPasswordInDB: false}
                    })

                }).catch(err => {
                console.log(err.response.data);
                if (err.response.status === 403) {
                    this.setState({
                        incorrectInputData: {...this.state.incorrectInputData, oldPasswordNotEqualPasswordInDB: true}
                    })
                }
            })
        } else {
            this.setState({
                incorrectInputData: {
                    ...this.state.incorrectInputData,
                    confirmPasswordEqualNewPassword: false
                }
            });
            this.setState({confirmPassword: ''})
        }
    };

    render() {
        return (
            <div className="d-flex justify-content-center align-items-center " style={{minHeight: '100vh'}}>
                <Form className="d-flex justify-content-around flex-column align-items-center "
                      style=
                          {{
                              width: '30%',
                              backgroundColor: 'rgba(0,0,0,0.55)',
                              paddingTop: '10px',
                              paddingBottom: '20px',
                              paddingLeft: '20px',
                              paddingRight: '20px',
                              borderRadius: '15px',
                              borderColor: '#d2d2d2',
                              borderWidth: '5px',
                              color: 'white',
                              boxShadow: '0 1px 0 #cfcfcf'
                          }}>
                    <div><h2>Зміна паролю:</h2></div>
                    <div className='d-flex flex-column justify-content-around align-items-center'
                         style=
                             {{
                                 width: '80%',
                                 border: '5px solid black',
                                 borderRadius: '25px'
                             }}>
                        <FormGroup className='d-flex justify-content-around flex-column align-items-center'
                                   controlId="oldPassword"
                                   style=
                                       {{
                                           width: '80%',
                                       }}>
                            <FormLabel>Старий пароль:</FormLabel>
                            {this.state.incorrectInputData.oldPasswordNotEqualPasswordInDB &&
                            <FormText><p
                                style=
                                    {{
                                        color: 'red',
                                        fontSize: '12px',
                                        textAlign: 'center'
                                    }}>
                                {this.state.errorMessage.incorrectOldPassword}</p>
                            </FormText>}
                            {this.state.incorrectInputData.incorrectOldPassword &&
                            <FormText><p
                                style=
                                    {{
                                        color: 'red',
                                        fontSize: '12px',
                                        textAlign: 'center'
                                    }}>
                                {this.state.errorMessage.incorrectPasswordPattern}</p>
                            </FormText>}
                            <FormControl required name='oldPassword' value={this.state.oldPassword}
                                         onChange={this.handleUserInput} type="password"
                                         onBlur={this.checkPasswordPattern}
                                         placeholder="Старий пароль"></FormControl>
                        </FormGroup>
                        <FormGroup className='d-flex flex-column justify-content-around align-items-center'
                                   controlId="newPassword"
                                   style=
                                       {{
                                           width: '80%'
                                       }}>
                            <FormLabel>Новий пароль:</FormLabel>
                            {this.state.incorrectInputData.incorrectNewPassword &&
                            <FormText><p
                                style=
                                    {{
                                        color: 'red',
                                        fontSize: '12px',
                                        textAlign: 'center'
                                    }}>
                                {this.state.errorMessage.incorrectPasswordPattern}</p>
                            </FormText>}
                            <FormControl required name='newPassword' value={this.state.newPassword}
                                         onChange={this.handleUserInput} type="password"
                                         onBlur={this.checkPasswordPattern}
                                         placeholder="Новий пароль"></FormControl>
                        </FormGroup>
                        <FormGroup className='d-flex flex-column justify-content-around align-items-center'
                                   controlId="confirmPassword"
                                   style=
                                       {{
                                           width: '80%'
                                       }}>
                            <FormLabel>Підтвердження паролю:</FormLabel>
                            {this.state.incorrectInputData.incorrectConfirmPassword &&
                            <FormText><p
                                style=
                                    {{
                                        color: 'red',
                                        fontSize: '12px',
                                        textAlign: 'center'
                                    }}>
                                {this.state.errorMessage.incorrectPasswordPattern}</p>
                            </FormText>}
                            <FormControl required name='confirmPassword' value={this.state.confirmPassword}
                                         onChange={this.handleUserInput} type="password"
                                         onBlur={this.checkPasswordPattern}
                                         placeholder="Підтвердження паролю"></FormControl>
                        </FormGroup>
                    </div>
                    <div>
                        {!this.state.incorrectInputData.confirmPasswordEqualNewPassword &&
                        this.state.incorrectInputData.confirmPasswordEqualNewPassword !== undefined &&
                        <FormText><p
                            style=
                                {{
                                    color: 'red',
                                    fontSize: '12px',
                                    textAlign: 'center'
                                }}>
                            {this.state.errorMessage.passwordsDoNotMatch}</p>
                        </FormText>}
                    </div>
                    <div>
                        <Button variant="primary"
                                style=
                                    {{
                                        heigth: '15%',
                                        marginTop: '10px'
                                    }}
                                onClick={this.changePassword}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}