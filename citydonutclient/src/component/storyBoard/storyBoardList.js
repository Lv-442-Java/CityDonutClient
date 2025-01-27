import React from 'react';
import axios from '../../utils/services';
import { StoryBoardItem } from './storyBoardItem';

export class StoryBoardList extends React.Component {
    state = {
        storyBoards: [],
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.props.projectId}/storyboard/verified`,
            { withCredentials: true })
            .then((response) => {
                this.setState({ storyBoards: response.data });
            });
    };

    render() {
        return (
            <div>
                {this.state.storyBoards.map(storyBoard => (
                    <StoryBoardItem
                        key={storyBoard.id}
                        resetStoryBoards={this.getData}
                        storyBoard={storyBoard}
                        isUserOwner={this.props.isUserOwner}
                    />
                ))}
            </div>
        );
    }
}
