import React from "react";
import {ProjectsFilter} from "./projectsFilter";
import {ProjectsList} from "./projectsList";
import axios from "axios";

export class Projects extends React.Component {

    state = {
        projects: [],
        filters: {
            status: 1,
            moneyFrom: 10000,
            moneyTo: 30000,
            categories: [1],
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
        axios.get(`http://localhost:8090/api/v1/project/filter?status=${this.state.filters.status}&moneyFrom=10000&moneyTo=30000&categories=3&categories=2`, {crossDomain: true}).then(response => {
            this.setState({projects: response.data}
            )
        })
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <ProjectsFilter setFilters={this.setFilters}/>
                <ProjectsList projects={this.state.projects}/>
            </div>
        )
    }
}
