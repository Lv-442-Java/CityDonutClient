import React from 'react';
import {SuccessfulProjectItem} from "./successfulProjectItem";
import axios from "axios";
import CardDeck from "react-bootstrap/CardDeck";
import {Container} from "react-bootstrap";

export class SuccessfulProjectsList extends React.Component {

    // state = {
    //     projects: [],
    // };

    // componentDidMount() {
    //     this.getData();
    // }

    // getData = () => {
    //     axios.get(`http://localhost:8091/api/v1/project/filter?page=${this.props.page}&size=3&status=6`)
    //         .then(response => this.setState({projects: response.data}))
    // };

    // getItems = () => {
    //     if (this.props.projects.length === 0) {
    //         return <p style={{height: '18rem', marginTop: '1rem', marginBottom: '2.5rem'}}>Оцініть наші найкращі
    //             проекти</p>;
    //     } else {
    //         return this.props.projects.map(project => (<SuccessfulProjectItem project={project}/>));
    //     }
    // };

    render() {
        return (
            <div>
                <Container>
                    <CardDeck className="d-flex justify-content-around">
                        {this.props.projects.map(project => (<SuccessfulProjectItem project={project}/>))}
                    </CardDeck>
                </Container>
            </div>
        )
    }
}
