import React from "react";
import {ProjectsFilter} from "./projectsFilter";
import {ProjectsList} from "./projectsList";
import axios from "axios";

export class Projects extends React.Component {

    state = {
        projects: [],
        filters: {}
    };

    setFilters = (filters) => {
        this.setState({filters: filters},
            () => this.getData())
    };

    changePage = (filters) => {
        filters.page=parseInt(filters.page)+1;
        return filters;
    };

    showMoreItems = () => {
        console.log(this.state.filters.categories);
        console.log(this.state.filters);
        this.setState({filters: this.changePage(this.state.filters)}, () => {
            console.log(this.state.filters.page);
            console.log(this.state.filters);
            axios.get('http://localhost:8091/api/v1/project/filter' + this.getUrl(),
                {withCredentials: true})
                .then(response => {
                    console.log(response.data);
                    this.setState({projects: this.state.projects.concat(response.data)})
                })
        });
    };

    getUrl = () => {
        let url = `?` +
            `page=${this.state.filters.page}&` +
            `size=${this.state.filters.size}`;
        this.state.filters.status !== undefined && (url += `&status=${this.state.filters.status}`);
        this.state.filters.moneyFrom !== undefined && (url += `&moneyFrom=${this.state.filters.moneyFrom}`);
        this.state.filters.moneyTo !== undefined && (url += `&moneyTo=${this.state.filters.moneyTo}`);
        this.state.filters.categories.length !== 0 && (url += `&categories=${this.state.filters.categories}`);
        this.props.history.push(url);
        return url;
    };

    getData = () => {
        axios.get('http://localhost:8091/api/v1/project/filter' + this.getUrl(),
            {withCredentials: true})
            .then(response => {
                this.setState({projects: response.data})
            })
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-3 col-sm-3 col-lg-3 col-xs-12">
                    <ProjectsFilter setFilters={this.setFilters} startLink={this.props.location.search}/>
                </div>
                <div className="col-md-9 col-sm-9 col-lg-9 col-xs-12">
                    <ProjectsList projects={this.state.projects} showMore={this.showMoreItems}/>
                </div>
            </div>
        )
    }
}

