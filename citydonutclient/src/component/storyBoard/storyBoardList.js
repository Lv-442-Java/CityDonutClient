import React from "react";
import axios from "axios";
import {StoryBoardItem} from "./storyBoardItem";

export class StoryBoardList extends React.Component {

    state = {
        storyBoards: []
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.props.projectId}/storyboard/verified`,
            {withCredentials: true})
            .then(response => {
                this.setState({storyBoards: response.data});
            })
    };

    render() {
        return (
            <div>
                {this.state.storyBoards.map(storyBoard =>
                    <StoryBoardItem storyBoard={storyBoard}/>
                )}
            </div>
        );
    }
}