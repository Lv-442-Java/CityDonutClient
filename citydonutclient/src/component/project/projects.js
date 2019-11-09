import React from "react";
import {ProjectsFilter} from "./projectsFilter";
import {ProjectsList} from "./projectsList";
import axios from "axios";

export class Projects extends React.Component {

    state = {
        projects: [],
        filters: {
            page: 0,
            size: 6,
            status: "default",
            moneyFrom: 0,
            moneyTo: "default",
            categories: ["default"],
        }
    };

    componentDidMount() {
        this.getData()
    }

    setFilters = (filters) => {
        this.setState({filters: filters},
            () => this.getData())
    };

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/filter?` +
            `page=${this.state.filters.page}&` +
            `size=${this.state.filters.size}&` +
            `status=${this.state.filters.status}&` +
            `moneyFrom=${this.state.filters.moneyFrom}&` +
            `moneyTo=${this.state.filters.moneyTo}&` +
            `categories=${this.state.filters.categories}`,
            {crossDomain: true})
            .then(response => {
                this.setState({projects: response.data})
            })
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-3 col-sm-3 col-lg-3 col-xs-12">
                    <ProjectsFilter setFilters={this.setFilters}/>
                </div>
                <div className="col-md-9 col-sm-9 col-lg-9 col-xs-12">
                    <ProjectsList projects={this.state.projects}/>
                </div>
            </div>
        )
    }
}
