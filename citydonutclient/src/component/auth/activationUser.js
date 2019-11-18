import React from 'react';
import axios from "axios";

export class ActivationUser extends React.Component {

    state = {
        status: undefined,
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/registration/activationUser?activationCode=${this.props.match.params.activationCode}`,
            {withCredentials: true}).then(response => {
            this.setState({status: response.status})
        })
    }

    render() {

        return (
            <div>
                <h1>,,,,,  </h1>
            </div>
        );
    }
}
