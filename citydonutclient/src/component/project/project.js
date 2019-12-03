import React from 'react';
import axios from 'axios';
import { PhotoSlider } from './photoSlider';
import { ProjectProgressBar } from './projectProgressBar';
import { ProjectScroller } from './projectScroller';

export class Project extends React.Component {
    state = {
        project: {},
        street: {
            place: '',
            coordinates: {
                lat: 0,
                lng: 0,
            },
        },
        galleryId: undefined,
        projectId: this.props.match.params.id,
    };


    componentDidMount() {
        this.getData();
    }

    getGallery = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.state.projectId}/gallery`,
            { withCredentials: true }).then((response) => {
            this.setState({ galleryId: response.data });
        });
    };

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.state.projectId}`,
            { withCredentials: true }).then((response) => {
            this.setState({
                project: response.data,
                street: {
                    place: response.data.location,
                    coordinates: {
                        lat: parseFloat(response.data.locationLatitude),
                        lng: parseFloat(response.data.locationLongitude),

                    },
                },
            }, () => { this.getGallery(); });
        });
    };

    render() {
        const {
            project, projectId, galleryId, street,
        } = this.state;
        return (

            <div>
                {(this.state.project.moneyNeeded != null) && (this.state.galleryId) && (
                    <div>
                        <PhotoSlider
                            projectId={projectId}
                            projectName={project.name}
                            galleryId={galleryId}
                        />
                        <ProjectProgressBar
                            projectId={projectId}
                            projectName={project.name}
                            moneyNeeded={project.moneyNeeded}
                            endDate={project.donationEndDate}
                        />
                        <ProjectScroller
                            projectId={projectId}
                            description={project.description}
                            location={street}
                            status={project.projectStatus.status}
                            galleryId={galleryId}
                            ownerFirstName={project.owner.firstName}
                            ownerLastName={project.owner.lastName}
                        />
                    </div>
                )}
            </div>
        );
    }
}
