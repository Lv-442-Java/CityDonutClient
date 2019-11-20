import React from 'react';
import axios from 'axios';
import { PhotoSlider } from './photoSlider';
import { ProjectProgressBar } from './projectProgressBar';
import {ProjectScroller} from "./projectScroller";

export class Project extends React.Component {
    state= {
        project: {},
        // eslint-disable-next-line react/prop-types
        projectId: this.props.match.params.id,
    }

    componentDidMount() {
        this.getData();
    }

    // eslint-disable-next-line react/sort-comp
    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.state.projectId}`, { withCredentials: true }).then((response) => {
            this.setState({ project: response.data });
        });
    };

    componentDidUpdate(prevProps) {
        // eslint-disable-next-line react/prop-types
        if (this.props.moneyNeeded !== prevProps.moneyNeeded) {
            // eslint-disable-next-line react/prop-types
            this.fetchData(this.props.moneyNeeded);
        }
    }

    render() {
        return (

            <div>
                {(this.state.project.moneyNeeded != null) ? (
                    <div>
                        {/* eslint-disable-next-line max-len */}
                        <PhotoSlider projectId={this.state.projectId} projectName={this.state.project.name} />
                        <ProjectProgressBar
                            projectId={this.state.projectId}
                            projectName={this.state.project.name}
                            moneyNeeded={this.state.project.moneyNeeded}
                            endDate={this.state.project.donationEndDate}
                        />
                        <ProjectScroller projectId={this.state.projectId}
                                         description={this.state.project.description}></ProjectScroller>
                    </div>
                ) : (<h1>Something went wrong. Reload the page, please</h1>)}
            </div>
        );
    }
}
