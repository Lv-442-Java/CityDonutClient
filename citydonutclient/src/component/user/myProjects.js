import React from 'react';
import axios from '../../utils/services';
import jwt from 'jwt-decode';
import { ProjectsList } from '../project/projectsList';

export class MyProjects extends React.Component {
    cookiesToJson = () => Object.fromEntries(document.cookie.split(/; */).map((c) => {
        const [key, ...v] = c.split('=');
        return [key, decodeURIComponent(v.join('='))];
    }));

    state ={
        projects: [],
        id: undefined,
        url: undefined,

    };

    componentDidMount() {
        this.getRole();
    }

    getRole = () => {
        if (this.cookiesToJson().JWT !== null) {
            const role = jwt(this.cookiesToJson().JWT).roles;
            this.setState({ id: jwt(this.cookiesToJson().JWT).id });
            console.log(`${role}-----`);
            role === 'user' ? this.setState({ url: 'ownerId' }, () => this.getData())
                : this.setState({ url: 'moderatorId' }, () => this.getData());
        } else {

        }
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
