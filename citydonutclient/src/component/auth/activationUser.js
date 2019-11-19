import React from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

export class ActivationUser extends React.Component {

    state = {
        status: undefined,
        aaa: this.props.match.params.activationCode
    }

    componentDidMount() {
        this.getData()
        console.log(this.state.aaa);

    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/registration/activationUser?activationCode=${this.props.match.params.activationCode}`,
            {withCredentials: true})
            .then(response => {
                this.setState({status: response.status})
            })
            .catch(err => {
                let data = err.response.data;

                console.log(data);
            })
    }

    render() {

        return (
            <div>
                <div>{this.state.status===204 &&  <Redirect to="/login" />}</div>
            </div>
        );
    }
}
