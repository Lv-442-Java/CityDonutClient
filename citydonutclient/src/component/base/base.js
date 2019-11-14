import React from 'react';
import {SuccessfulProjectsList} from "./successfulProjectsList";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";

export class Base extends React.Component {

    state = {};

    render() {
        return (
            <div>
                <Carousel>
                    <Carousel.Item className="text-center">
                        <SuccessfulProjectsList page={0} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <SuccessfulProjectsList page={1} />
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
