import React from 'react';

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export class PhotoSlider extends React.Component {
    state= {

        photos: [],
        projectId: this.props.projectId,

    };

    componentDidMount() {
        this.getData();
    }

    setPhotos = (photos) => {
        this.setState({ photos },
            () => this.getData());
    };

    setProjectName = (projectName) => {
        this.setState({ projectName },
            () => this.getData());
    };


    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.props.projectId}/getUrl`,
            { withCredentials: true }).then((response) => {
            this.setState({ photos: response.data });
        });
    };

    render() {
        const { photos } = this.state;
        return (
            <div className="text-center">
                <Carousel>
                    {photos.map(photo => (
                        <Carousel.Item style={{ backgroundColor: '#E5E5E5' }}>
                            <img src={photo} style={{ width: '50%', margin: '10px' }} />
                            <Carousel.Caption>
                                <h2>{this.props.projectName}</h2>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        );
    }
}
