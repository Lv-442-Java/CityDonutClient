import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../../utils/services';

export class ActivationUser extends React.Component {
    state = {
        status: undefined,
        errorMessage: undefined,
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/registration/activationUser?activationCode=${this.props.match.params.activationCode}`,
            { withCredentials: true })
            .then((response) => {
                this.setState({ status: response.status });
            })
            .catch((err) => {
                this.setState({ errorMessage: err.response.data.message });
            });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.errorMessage
                        && (
                            <div className="alert alert-danger" role="alert">
                                {' '}
Це провал !!!
                                {this.state.errorMessage}
                            </div>
                        )
                    }
                </div>
                <div>{this.state.status === 204 && <Redirect to="/login" />}</div>
            </div>
        );
    }
}
