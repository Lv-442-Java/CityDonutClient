import React from "react";
import {PhotoSlider} from "./photoSlider";

export class Project extends React.Component{
    state= {

        projectId: this.props.match.params.id,
        projectName: "My Project"
    }
    render() {
        return(
            <PhotoSlider projectId = {this.state.projectId}></PhotoSlider>
        )
    }
}