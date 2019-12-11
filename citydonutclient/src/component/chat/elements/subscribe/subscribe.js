import React from 'react';
import './subscribe.css';
import axios from 'axios';

export class Subscribe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subscribed: false,
            port: this.props.port,
            projectId: this.props.project,
        };
    }

    isCurrentUserSubscribed = async () => {
        const getUrl = `http://localhost:${this.state.port}/api/v1/user/subscribe/${this.state.projectId}`;
        return axios.get(getUrl, { withCredentials: true });
    };

    componentDidMount() {
        this.isCurrentUserSubscribed().then((response) => {
            if (response.data.id !== undefined) this.setState({ subscribed: true });
            else this.setState({ subscribed: false });
        });
    }

    subscribeToProject = async () => {
        const postUrl = `http://localhost:${this.state.port}/api/v1/user/subscribe/${this.state.projectId}`;
        return axios.post(postUrl, {}, { withCredentials: true });
    };

    unsubscribeToProject = async () => {
        const deleteUrl = `http://localhost:${this.state.port}/api/v1/user/subscribe/${this.state.projectId}`;
        return axios.delete(deleteUrl, { withCredentials: true });
    };

    handleCheckboxChange = () => {
        if (this.state.subscribed === false) {
            this.subscribeToProject().then(() => {
                this.setState({ subscribed: true });
            });
        } else {
            this.unsubscribeToProject().then(() => {
                this.setState({ subscribed: false });
            });
        }
    };

    render() {
        return (
            <label>
                <span className="subscribe-label">Subscribe: </span>
                <input
                    className="subscribe-checkbox"
                    checked={this.state.subscribed}
                    type="checkbox"
                    onChange={this.handleCheckboxChange}
                />
            </label>
        );
    }
}
