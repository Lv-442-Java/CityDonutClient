import React from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

export class StoryBoardItem extends React.Component {

    state = {
        galleryId: null,
        photos: []
    };

    componentDidMount() {
        console.log(this.props.storyBoard.id);
        this.getData();
    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/storyboard/${this.props.storyBoard.id}/gallery`, {withCredentials: true}).then(response => {
            axios.get(`http://localhost:8091/api/v1/gallery/${response.data}/`, {withCredentials: true}).then(response => {
                this.setState({
                    photos: response.data.filter(data => {
                        return data.mediaType === "photo"
                    }).map(data => data.fileDownloadUri)
                })
            })
        });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-4 text-center">
                        <h5>{this.props.storyBoard.moneySpent}₴</h5>
                    </div>
                    <div className="col-8" style={{'border-left': '1px solid grey'}}>
                        <Carousel className="text-center" style={{'background-color':'grey'}}>
                            {this.state.photos.map(photo => (
                                <Carousel.Item>
                                    <img src={photo} style={{width: "50%", margin: "10px"}}/>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <p className="text-center">{this.props.storyBoard.description}</p>
                        <p style={{
                            'color': 'grey',
                            'font-size': '10px'
                        }}>{new Date(this.props.storyBoard.date).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        );
    }
}