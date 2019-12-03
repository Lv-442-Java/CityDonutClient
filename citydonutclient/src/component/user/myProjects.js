import React from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import { ProjectsList } from '../project/projectsList';

export class MyProjects extends React.Component {
    state = {
        projects: [],
        id: undefined,
        url: undefined,
    };

    componentDidMount() {
        this.getRole();
    }

    cookiesToJson = () => Object.fromEntries(document.cookie.split(/; */).map((c) => {
        const [key, ...v] = c.split('=');
        return [key, decodeURIComponent(v.join('='))];
    }));

    getRole = () => {
        const role = jwt(this.cookiesToJson().JWT).roles;
        this.setState({ id: jwt(this.cookiesToJson().JWT).id });
        role === 'user' ? this.setState({ url: 'ownerId' }, () => this.getData())
            : this.setState({ url: 'moderatorId' }, () => this.getData());
    };

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/filter?${this.state.url}=${this.state.id}`,
            { withCredentials: true })
            .then((response) => {
                this.setState({ projects: response.data });
            });
    };

    render() {
        return (
            <ProjectsList projects={this.state.projects} />
        );
    }
}
