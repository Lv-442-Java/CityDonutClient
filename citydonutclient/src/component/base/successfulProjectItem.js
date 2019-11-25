import React from 'react';
import Card from "react-bootstrap/Card";
import ProgressBar from "../progressBar/progressBar";
import {Link} from "react-router-dom";
import axios from "axios";

export class SuccessfulProjectItem extends React.Component {

    state = {
        avatar: "https://i0.wp.com/storage.googleapis.com/blog-images-backup/1*3SVfBkNZI2f-sspiq59xcw.png?zoom=1.25&resize=391%2C321&ssl=1",
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.props.project.id}/gallery`).then(response => {
            axios.get(`http://localhost:8091/api/v1/gallery/${response.data}/getAvatar`).then(response => {
                this.setState({avatar: response.data})
            })
        })
    };

    render() {
        return (
            <div>
                <Link to={`projects/${this.props.project.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <Card border="primary" className="text-center mx-auto"
                          style={{height: '18rem', width: '23rem', marginTop: '1rem', marginBottom: '2.5rem'}}>
                        <Card.Body>
                            <Card.Img variant="top" style={{height: '11.5rem'}}
                                      src={this.state.avatar}/>

                            <Card.Title>{this.props.project.name}</Card.Title>

                            <ProgressBar doneTip="Зібрано!" donePercent={100}
                                         doneLabel={this.props.project.moneyNeeded} undoneTip="Потрібно зібрати!"
                                         undoneLabel={0}/>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        )
    }
}
