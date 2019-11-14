import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'

export class Login extends React.Component {
    state = {
        "email": undefined,
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
            email: this.state.email,
            password: this.state.password
        };
        console.log(data);
        axios.post(`http://localhost:8080/sign-in`,
            data,
            {crossDomain: true}).then(response => console.log(response.data))
    };



      render() {
        return (

            <div className="text-center">
                <h2>Логнінування</h2>

                <div className="col-5">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Введіть ваш email" onChange={this.setEmail}/>
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group controlId="formPlaintextPassword">
                        <Form.Control type="password" placeholder="Введіть ваш пароль" onChange={this.setPassword}/>
                    </Form.Group>
                </div>

                <button className="btn btn-success" onClick={this.insertLoginData}>Login</button>

            </div>

        )
    }
}

export default Login;
