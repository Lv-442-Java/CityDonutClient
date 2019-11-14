import React from 'react';
import {SuccessfulProjectsList} from "./successfulProjectsList";
import Carousel from "react-bootstrap/Carousel";

export class Base extends React.Component {

    state = {};

    render() {
        return (
            <div>
                <Carousel style={{"background-color": "#C6C2C2"}}>
                    <Carousel.Item className="text-center">
                        <SuccessfulProjectsList page={0}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <SuccessfulProjectsList page={1}/>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
