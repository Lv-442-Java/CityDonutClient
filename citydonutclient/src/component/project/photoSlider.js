import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'


export class PhotoSlider extends React.Component{

    state= {
        photos:[],
        projectId: this.props.projectId,
    };

    componentDidMount() {

        return fetch(`http://localhost:8091/api/v1/gallery/${this.props.galleryId}/`)
            .then((response) => response.json())
            .then((responseJson) => {
                let url = responseJson.filter(obj => obj.mediaType === "photo");
                this.setState({photos: url}, function () {
                });
            })
    };


    render() {

        const { photos } = this.state;
        return (
                <div className="text-center">
                    <Carousel>
                    {photos.map(photo => (
                        <Carousel.Item style={{backgroundColor: "#E5E5E5"}} >
                            <img  src={photo.fileDownloadUri} style={{width: "50%", margin:"10px"}}/>
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
