import React from 'react';
import axios from 'axios';
import { PhotoSlider } from './photoSlider';
import { ProjectProgressBar } from './projectProgressBar';
import {ProjectScroller} from "./projectScroller";
import {StoryBoardList} from "../storyBoard/storyBoardList";

export class Project extends React.Component {
    state = {
        project: {},
        street: {
            place: '',
            coordinates: {
                lat: 0,
                lng: 0
            }
        },
        projectId: this.props.match.params.id
}


    componentDidMount() {
        this.getData();
        this.setStreet();
    }


    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.state.projectId}`,
            { withCredentials: true }).then((response) => {
            this.setState({ project: response.data,
                street: {
                    place: response.data.location,
                    coordinates: {
                        lat: parseFloat(response.data.locationLatitude),
                        lng: parseFloat(response.data.locationLongitude)

                    }
                } });
        });
    };

    componentDidUpdate(prevProps) {

        if (this.props.moneyNeeded !== prevProps.moneyNeeded) {

            this.fetchData(this.props.moneyNeeded);
        }
    }
    setStreet = () => {
        this.setState({
            street: {
                place: this.state.project.location,
                coordinates: {
                    lat: parseFloat(this.state.project.locationLatitude),
                    lng: parseFloat(this.state.project.locationLongitude)

                }
            }
        })

    };

    render() {

        console.log(this.state.street.coordinates)

        return (

            <div>
                {(this.state.project.moneyNeeded != null) ? (
                    <div>
                        <PhotoSlider projectId={this.state.projectId} projectName={this.state.project.name} />
                        <ProjectProgressBar
                            projectId={this.state.projectId}
                            projectName={this.state.project.name}
                            moneyNeeded={this.state.project.moneyNeeded}
                            endDate={this.state.project.donationEndDate}
                        />
                        <ProjectScroller projectId={this.state.projectId}
                                         description={this.state.project.description}
                                         location={this.state.street}></ProjectScroller>
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
