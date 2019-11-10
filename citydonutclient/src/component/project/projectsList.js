import React from "react";
import {ProjectsItem} from "./projectsItem";

export class ProjectsList extends React.Component{

    render() {
        return (

            <div>
                {this.props.projects.map(element => <ProjectsItem key={element.id} name={element.name} />
                )}
            </div>
        )
    }
}
