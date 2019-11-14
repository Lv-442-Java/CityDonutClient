import React from "react";
import {ProjectsFilter} from "./projectsFilter";
import {ProjectsList} from "./projectsList";
import axios from "axios";
import queryString from 'query-string'

export class Projects extends React.Component {

    state = {
        projects: [],
        filters: {
            page: 0,
            size: 6,
            status: null,
            moneyFrom: null,
            moneyTo: null,
            categories: [],
        }
    };

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);

        let newFilters = {
            page: values.page === undefined ? null : values.page,
            size: values.size === undefined ? null : values.size,
            status: values.status === undefined ? null : values.status,
            moneyFrom: values.moneyFrom === undefined ? null : values.moneyFrom,
            moneyTo: values.moneyTo === undefined ? null : values.moneyTo,
            categories: values.categories === undefined ? [] : values.categories,
        };
        this.setState({filters:newFilters},()=>this.getData());
    }

    setFilters = (filters) => {
        this.setState({filters: filters},
            () => this.getData())
    };

    getUrl = () => {
        let url = `?` +
            `page=${this.state.filters.page}&` +
            `size=${this.state.filters.size}`;
        if (this.state.filters.status !== null) {
            url += `&status=${this.state.filters.status}`;
        }
        if (this.state.filters.moneyFrom !== null) {
            url += `&moneyFrom=${this.state.filters.moneyFrom}`
        }
        if (this.state.filters.moneyTo !== null) {
            url += `&moneyTo=${this.state.filters.moneyTo}`;
        }
        if (this.state.filters.categories.length !== 0) {
            url += `&categories=${this.state.filters.categories}`
        }
        this.props.history.push(url);
        return url;
    };

    getData = () => {
        axios.get('http://localhost:8091/api/v1/project/filter' + this.getUrl(),
            {crossDomain: true})
            .then(response => {
                this.setState({projects: response.data})
            })
    };

    render() {
        // console.log(this.state.filters.categories)
        return (
            <div className="row">
                <div className="col-md-3 col-sm-3 col-lg-3 col-xs-12">
                    <ProjectsFilter setFilters={this.setFilters} />
                </div>
                <div className="col-md-9 col-sm-9 col-lg-9 col-xs-12">
                    <ProjectsList projects={this.state.projects}/>
                </div>
            </div>
        )
    }
}

