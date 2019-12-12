import React from 'react';
import jwt from 'jwt-decode';
import axios from '../../utils/services';
import { ProjectsList } from '../project/projectsList';
import { ProjectsFilter } from '../project/projectsFilter';

export class MyProjects extends React.Component {
    state ={
        projects: [],
        id: undefined,
        url: undefined,
        page: 0,
        newProjects: [],
        filters:{}

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

    getUrl = () => {
        let url = '';
        this.state.filters.status !== undefined && (url += `&status=${this.state.filters.status}`);
        this.state.filters.moneyFrom !== undefined && (url += `&moneyFrom=${this.state.filters.moneyFrom}`);
        this.state.filters.moneyTo !== undefined && (url += `&moneyTo=${this.state.filters.moneyTo}`);
        this.state.filters.categories !== undefined && (url += `&categories=${this.state.filters.categories}`);
        this.props.history.push(`?${url.slice(1)}`);
        return `?page=${this.state.page}&size=6${url}`;
    };


    showMoreItems = () => {
        this.setState({ page: this.state.page + 1 }, () => {
            axios.get(`http://localhost:8091/api/v1/project/filter${this.state.url}=${this.state.id}&page=${this.state.page}&${this.getUrl()}`,
                { withCredentials: true })
                .then((response) => {
                    this.setState({
                        projects: this.state.projects.concat(response.data),
                        newProjects: response.data,
                    });
                });
        });
    };

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/filter?${this.state.url}=${this.state.id}&${this.getUrl()}`,
            { withCredentials: true })
            .then((response) => {
                this.setState({ projects: response.data });
            });
    };
    render() {

        return (
            <div>
                {(this.state.projects.length != 0)
                    ? (
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
                    ) : (
                        <div className="d-flex justify-content-center p-5">
                            <h1>Ви не маєте власних проектів.</h1>
                        </div>
                    )}
            </div>
        );
    }
}
