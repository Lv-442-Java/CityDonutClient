import React from 'react';
import axios from 'axios';
import { ProjectsList } from '../project/projectsList';

export class MyProjects extends React.Component {
    state ={
        projects: [],
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('http://localhost:8091/api/v1/user/projects',
            { withCredentials: true })
            .then((response) => {
                this.setState({ projects: response.data });
            });
    };

    render() {
        console.log(`${this.state.projects} ###`);
        return (
            <ProjectsList projects={this.state.projects} />
        );
    }
}
