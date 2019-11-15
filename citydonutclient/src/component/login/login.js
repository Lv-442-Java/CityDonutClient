import React from 'react';
import axios from "axios";
import Form from "react-bootstrap/Form";

export class Login extends React.Component {

    state = {
        "userEmail": "vanivsky.oleh.lv@gmail.com",
        "password": "user"
    };

    setEmail = (email) => {
        this.setState({userEmail: email.target.value});
    };

    setPassword = (pass) => {
        this.setState({password: pass.target.value});
    };

    insertRegistrationData = () => {
        let data = {
            userEmail: this.state.userEmail,
            password: this.state.password
        };

        axios.post('http://localhost:8080/sign-in',
            data,
            {
                withCredentials: true,
                // crossDomain: true
            }).then(response => console.log(response.data))
    };

    insertRegistrationData__ = () => {


        axios.get(`http://localhost:8080/`,

            {withCredentials: true}).then(response => console.log(response.data))
    };

    render() {
        return (
            <div>
                <div className="col-5">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Введіть ваш email" onChange={this.setEmail} value={this.state.userEmail}/>
                    </Form.Group>
                    <a href="http://localhost:8080/googlelogin">Google Login</a>
                </div>


                <div className="col-5">
                    <Form.Group controlId="formPlaintextPassword">
                        <Form.Control type="password" placeholder="Введіть ваш пароль" onChange={this.setPassword} value={this.state.password}/>
                    </Form.Group>
                    <button className="btn btn-success" onClick={this.insertRegistrationData}>Register</button>
                    <button className="btn btn-success" onClick={this.insertRegistrationData__}>Register</button>
                </div>
            </div>

        )
    }
}
