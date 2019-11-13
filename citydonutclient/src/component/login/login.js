import React from 'react';
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export class Login extends React.Component {

    state = {
        "email": undefined,
        "pass": undefined
    };

    ShowAlert = () => {
        alert(this.state.email + this.state.pass);
    };

    setEmail = (email) => {
        this.setState({email: email.target.value});
    };

    setPassword = (pass) => {
        this.setState({pass: pass.target.value});
    };

    isVisible = () => {
        return this.state.pass !== undefined && this.state.email !== undefined &&
            this.state.pass !== "" && this.state.email !== ""
    };

    render() {
        return (
            <div>
                {/*<input type="email" onChange={this.setEmail}/>*/}
                {/*<input type="password" onChange={this.setPassword}/>*/}
                {/*{this.isVisible() && <input type="button" value="submit" onClick={this.ShowAlert}/>}*/}

                {/*<FacebookLoginButton onClick={() => alert("Hello")}>*/}
                {/*    <span>Custom text</span>*/}
                {/*</FacebookLoginButton>*/}

                {/*<GoogleLoginButton onClick={() => alert("Hello")} />*/}

                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Логінування</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <label> Логін:</label>
                            <input type="email" onChange={this.setEmail}/>
                        </div>
                        <div>
                            <label>Пароль:</label>
                            <input type="password" onChange={this.setPassword}/>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>

                        <Button variant="primary">Увійти</Button>
                        <FacebookLoginButton onClick={() => alert("Hello")}>

                        </FacebookLoginButton>

                        <GoogleLoginButton onClick={() => alert("Hello")}/>
                    </Modal.Footer>
                </Modal.Dialog>

            </div>
        )
    }
}
