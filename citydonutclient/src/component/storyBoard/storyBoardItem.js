import React from "react";
import axios from "axios";
import {PhotoSlider} from "../project/photoSlider";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";

export class StoryBoardItem extends React.Component {

    // state = {
    //   photo : []
    // };

    // componentDidMount() {
    //     console.log(this.props.storyBoard.id);
    //     this.getData();
    // }

    // getData = () => {
    //     axios.get(`http://localhost:8091/api/v1/storyBoard/media/${this.props.storyBoard.id}`, { withCredentials: true }).then(response => {
    //         this.setState({photos: response.data}
    //         )
    //     })
    // };

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-4 text-center">
                        <p>{this.props.storyBoard.moneySpent}</p>
                    </div>
                    <div className="col-8" style={{'border-left':'1px solid grey'}}>
                        {/*<Carousel >*/}
                        {/*    {this.state.photos.map(photo => (*/}
                        {/*        <Carousel.Item >*/}
                        {/*            <img  src={photo} style={{width: "50%", margin:"10px"}}/>*/}
                        {/*        </Carousel.Item>*/}
                        {/*    ))}*/}
                        <p className="text-center">{this.props.storyBoard.description}</p>
                        <p style={{'color':'grey','font-size':'10px'}}>{new Date(this.props.storyBoard.date).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        );
    }
}