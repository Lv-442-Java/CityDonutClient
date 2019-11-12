import React from "react";
import {PhotoSlider} from "./photoSlider";
import {ProjectProgressBar} from "./projectProgressBar";

export class Project extends React.Component{
    state= {

        projectId: this.props.match.params.id,
        projectName: "My Project"
    }
    render() {
        return(
            <div>
            <PhotoSlider projectId = {this.state.projectId}></PhotoSlider>
                <ProjectProgressBar></ProjectProgressBar>
            </div>

        )
    }
}