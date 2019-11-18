import React from 'react';

export class Login extends React.Component {
    state = {
        email: undefined,
        pass: undefined,
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

    isVisible = () => this.state.pass !== undefined && this.state.email !== undefined
        && this.state.pass !== '' && this.state.email !== '';

    render() {
        return (
            <div>
                <input type="email" onChange={this.setEmail}/>
                <input type="password" onChange={this.setPassword}/>
                {this.isVisible() && <input type="button" value="submit" onClick={this.ShowAlert}/>}
                <div>
                    <p> Для реєстрації перейдіть сюди => <a href="http://localhost:3000/registration" target="ddd">Реєстрація</a></p>
                </div>
            </div>
    );
    }
    }
