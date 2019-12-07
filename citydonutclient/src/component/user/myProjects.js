import React from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import { ProjectsList } from '../project/projectsList';
import { ProjectsFilter } from '../project/projectsFilter';

export class MyProjects extends React.Component {
    state ={
        projects: [],
        id: undefined,
        url: undefined,
        page: 0,
        newProjects: [],

    };

    componentDidMount() {
        this.getRole();
    }

    setFilters = (filters) => {
        this.setState({ filters },
            () => this.getData());
    };

    cookiesToJson = () => Object.fromEntries(document.cookie.split(/; */).map((c) => {
        const [key, ...v] = c.split('=');
        return [key, decodeURIComponent(v.join('='))];
    }));

    getRole = () => {
        if (this.cookiesToJson().JWT !== null) {
            const role = jwt(this.cookiesToJson().JWT).roles;
            this.setState({ id: jwt(this.cookiesToJson().JWT).id });
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

    showMoreItems = () => {
        this.setState({ page: this.state.page + 1 }, () => {
            axios.get(`http://localhost:8091/api/v1/project/filter${this.state.url}=${this.state.id}&page=${this.state.page}`,
                { withCredentials: true })
                .then((response) => {
                    this.setState({
                        projects: this.state.projects.concat(response.data),
                        newProjects: response.data,
                    });
                });
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-3 col-sm-3 col-lg-3 col-xs-12">
                    <ProjectsFilter
                        isOwner
                        setFilters={this.setFilters}
                        startLink={this.props.location.search}
                    />
                </div>
                <div className="col-md-9 col-sm-9 col-lg-9 col-xs-12">
                    <ProjectsList
                        projects={this.state.projects}
                        showMore={this.showMoreItems}
                        newProjects={this.state.newProjects}
                    />
                </div>
            </div>
        );
    }
}
