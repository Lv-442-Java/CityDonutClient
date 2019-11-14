import React from 'react';
import {SuccessfulProjectItem} from "./successfulProjectItem";
import axios from "axios";

export class SuccessfulProjectsList extends React.Component {

    state = {
        projects : [],
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/filter?page=${this.props.page}&size=3&status=6`)
            .then(response => this.setState({projects : response.data}))
    };

    render() {
        return (
            <div className="row">
                {this.state.projects.map(project => (
                    <SuccessfulProjectItem project={project} />
                ))}
            </div>
        )
    }
}
