import React from 'react';

import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import * as photos from "react-bootstrap/cjs/utils/ElementChildren";

export class PhotoSlider extends React.Component{

    state= {
    photos:[],
    projectId:this.props.id,
    projectName:this.props.name
}
    componentDidMount() {
        this.getData()
    }

    setPhotos = (photos) => {
        this.setState({photos: photos},
            () => this.getData())
    };

    setProjectName = (projectName) => {
        this.setState({projectName: projectName},
            () => this.getData())
    };


    getData = () => {
        axios.get(`http://localhost:8090/api/v1/project/id=${this.state.projectId}/getUrl`, {crossDomain: true}).then(response => {
            this.setState({projects: response.data}
            )
        })
    };

    render() {
        const { photos } = this.state;
        return (
            <div Style={{ maxHeight: 100, maxWidth: 200 }}>
                <Carousel>
                    {photos.map(photo => (
                        <Carousel.Item>
                            <img className='d-block w-100' src={photo} alt='First slide' />
                            <Carousel.Caption>
                                <h2>{this.state.projectName}</h2>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        );
    }

}