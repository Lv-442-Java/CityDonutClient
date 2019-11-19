import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormText from "react-bootstrap/FormText";
import axios from "axios";

export class UserEdit extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        incorrectInputData: {
            firstName: false,
            lastName: false,
            email: false
        },
        errorMessage: {
            incorrectFirstName: 'Ім\'я повинне містити від 3 до 30 латинських, або україських літер' ,
            incorrectLastName: 'Прізвище повинне містити від 3 до 30 латинських, або україських літер',
            incorrectEmail: 'Неправильний email'
        }
    };

    /*handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };*/

    /*checkPasswordPattern = (e) => {
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
    };*/

    /*checkPassword = (password) => {
        if (password === '') return true;
        return /^[a-zA-Z0-9]{4,15}$/.test(password);
    };*/

   /* changePassword = () => {
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
    };*/

    render() {
        return (
            <div className="d-flex justify-content-end " style={{minHeight: '100vh'}}>
                <Form className="d-flex justify-content-around flex-column align-items-center "
                      style=
                          {{
                              width: '20%',
                              backgroundColor: 'rgba(0,0,0,0.55)',
                              paddingTop: '10px',
                              paddingBottom: '20px',
                              paddingLeft: '20px',
                              paddingRight: '20px',
                              borderTopLeftRadius: '15px',
                              borderBottomLeftRadius: '15px',
                              borderColor: '#d2d2d2',
                              borderWidth: '5px',
                              color: 'white',
                              boxShadow: '0 1px 0 #cfcfcf'
                          }}>
                    <div><h2>Профіль:</h2></div>
                    <div className='d-flex flex-column justify-content-around align-items-center'
                         style=
                             {{
                                 width: '80%',
                                 border: '5px solid black',
                                 borderRadius: '25px'
                             }}>
                        <FormGroup className='d-flex justify-content-around flex-column align-items-center'
                                   controlId="firstName"
                                   style=
                                       {{
                                           width: '80%',
                                       }}>
                            <FormLabel>Ім'я:</FormLabel>
                            {this.state.incorrectInputData.firstName &&
                            <FormText><p
                                style=
                                    {{
                                        color: 'red',
                                        fontSize: '12px',
                                        textAlign: 'center'
                                    }}>
                                {this.state.errorMessage.incorrectFirstName}</p>
                            </FormText>}
                            <FormControl name='firstName' value={this.state.firstName} type = "password">
                            </FormControl>
                        </FormGroup>
                        <FormGroup className='d-flex flex-column justify-content-around align-items-center'
                                   controlId="lastName"
                                   style=
                                       {{
                                           width: '80%'
                                       }}>
                            <FormLabel>Прізвище:</FormLabel>
                            {this.state.incorrectInputData.lastName &&
                            <FormText><p
                                style=
                                    {{
                                        color: 'red',
                                        fontSize: '12px',
                                        textAlign: 'center'
                                    }}>
                                {this.state.errorMessage.incorrectLastName}</p>
                            </FormText>}
                            <FormControl required name='lastName' value={this.state.lastName}
                                         /*onChange={}
                                         onBlur={}*/
                            >
                            </FormControl>
                        </FormGroup>
                        <FormGroup className='d-flex flex-column justify-content-around align-items-center'
                                   controlId="email"
                                   style=
                                       {{
                                           width: '80%'
                                       }}>
                            <FormLabel>Email:</FormLabel>
                            {this.state.incorrectInputData.email &&
                            <FormText><p
                                style=
                                    {{
                                        color: 'red',
                                        fontSize: '12px',
                                        textAlign: 'center'
                                    }}>
                                {this.state.errorMessage.incorrectEmail}</p>
                            </FormText>}
                            <FormControl name='email' value={this.state.email}
                                         /*onChange={}
                                         onBlur={}*/
                            ></FormControl>
                        </FormGroup>
                    </div>
                    <div>
                        <Button variant="primary"
                                style=
                                    {{
                                        heigth: '15%',
                                        marginTop: '10px'
                                    }}
                                /*onClick={}*/
                        >
                            Редагувати
                        </Button>
                        <Button variant="primary"
                                style=
                                    {{
                                        heigth: '15%',
                                        marginTop: '10px',
                                        marginLeft:'10px'
                                    }}
                        >
                            Змінити пароль
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}
