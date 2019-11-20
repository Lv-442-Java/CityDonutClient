import React from "react";
import {PhotoSlider} from "./photoSlider";
import {ProjectProgressBar} from "./projectProgressBar";
import axios from "axios";
import {StoryBoardList} from "../storyBoard/storyBoardList";

export class Project extends React.Component{
    state= {
        project: {},
        projectId: this.props.match.params.id,
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.state.projectId}`, { withCredentials: true }).then(response => {
        this.setState({project: response.data})
    })

    };

    componentDidUpdate(prevProps) {

        if (this.props.moneyNeeded !== prevProps.moneyNeeded) {
            this.fetchData(this.props.moneyNeeded);
        }
    }
    render() {

        return(

            <div>
                {(this.state.project.moneyNeeded != null ) ? (
                    <div>
                        <PhotoSlider projectId={this.state.projectId} projectName={this.state.project.name}></PhotoSlider>
                        <ProjectProgressBar projectId={this.state.projectId} projectName={this.state.project.name}
                        moneyNeeded={this.state.project.moneyNeeded}
                        endDate={this.state.project.donationEndDate}></ProjectProgressBar>
                        <StoryBoardList projectId={this.state.projectId}/>
                    </div>
                    ): (<h1>Something went wrong. Reload the page, please</h1>)}
            </div>
        );
    }
}