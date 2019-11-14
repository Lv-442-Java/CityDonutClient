import React from 'react';
import {SuccessfulProjectsList} from "./successfulProjectsList";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import ProgressBar from "../progressBar/progressBar";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

export class SuccessfulProjectItem extends React.Component {
    render() {
        return (
            <div>

                <Card border="primary" className="text-center mx-auto"
                      style={{width: '18rem', marginTop: '2rem'}}>
                    <Card.Img variant="top"
                              src="https://i0.wp.com/storage.googleapis.com/blog-images-backup/1*3SVfBkNZI2f-sspiq59xcw.png?zoom=1.25&resize=391%2C321&ssl=1"/>
                    <Card.Body>

                        <Card.Title>{this.props.project.name}</Card.Title>

                        <div className="row">
                            <Card.Text style={{height: '3rem'}}>
                                {this.props.project.moneyNeeded}
                            </Card.Text>

                            <Link to={`projects/${this.props.id}`} style={{textDecoration: 'none', color: 'black'}}>
                                <Button variant="outline-dark">Детальніше</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
