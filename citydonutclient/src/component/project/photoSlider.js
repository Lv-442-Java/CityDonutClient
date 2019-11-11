import React from 'react';

import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

import * as photos from "react-bootstrap/cjs/utils/ElementChildren";

export class PhotoSlider extends React.Component{

    state= {

    photos:[],
    projectId: this.props.match.params.id,
    projectName:"My Project"
        /*projectName:this.props.projectName*/
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
        axios.get(`http://localhost:8000/api/v1/project/${this.props.match.params.id}/getUrl`, {crossDomain: true}).then(response => {
            this.setState({photos: response.data}
            )
        })
    };

    render() {

        const { photos } = this.state;
        return (
                <div class="text-center">
                <Carousel >
                    {photos.map(photo => (
                        <Carousel.Item >
                            <img  src={photo} style={{width: "50%", margin:"10px"}}/>
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
