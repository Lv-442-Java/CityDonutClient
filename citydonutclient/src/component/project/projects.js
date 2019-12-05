import React from 'react';
import axios from 'axios';
import {ProjectsFilter} from './projectsFilter';
import {ProjectsList} from './projectsList';

export class Projects extends React.Component {
    state = {
        projects: [],
        newProjects: [],
        filters: {},
        page: 0,
    };

    setFilters = (filters) => {
        this.setState({filters},
            () => this.getData());
    };

    showMoreItems = () => {
        this.setState({page: this.state.page + 1}, () => {
            axios.get(`http://localhost:8091/api/v1/project/filter${this.getUrl()}`,
                {withCredentials: true})
                .then((response) => {
                    this.setState({projects: this.state.projects.concat(response.data), newProjects: response.data});
                });
        });
    };

    getUrl = () => {
        let url = '';
        this.state.filters.status !== undefined && (url += `&status=${this.state.filters.status}`);
        this.state.filters.moneyFrom !== undefined && (url += `&moneyFrom=${this.state.filters.moneyFrom}`);
        this.state.filters.moneyTo !== undefined && (url += `&moneyTo=${this.state.filters.moneyTo}`);
        this.state.filters.categories.length !== 0 && (url += `&categories=${this.state.filters.categories}`);
        this.props.history.push(`?${url.slice(1)}`);
        return `?page=${this.state.page}&size=6${url}`;
    };

    getData = () => {
        this.setState({page: 0}, () => {
            axios.get(`http://localhost:8091/api/v1/project/filter${this.getUrl()}`,
                {withCredentials: true})
                .then((response) => {
                    this.setState({projects: response.data, newProjects: response.data});
                });
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-3 col-sm-3 col-lg-3 col-xs-12">
                    <ProjectsFilter
                        isOwner={false}
                        setFilters={this.setFilters}
                        startLink={this.props.location.search}
                    />
                </div>
                <div className="col-md-9 col-sm-9 col-lg-9 col-xs-12">
                    <ProjectsList projects={this.state.projects} showMore={this.showMoreItems}
                                  newProjects={this.state.newProjects}/>
                </div>
            </div>
        );
    }
}
