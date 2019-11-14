import React from 'react';
import {SuccessfulProjectItem} from "./successfulProjectItem";
import axios from "axios";
import CardDeck from "react-bootstrap/CardDeck";
import {Container} from "react-bootstrap";

export class SuccessfulProjectsList extends React.Component {

    state = {
        projects: [],
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/project/filter?page=${this.props.page}&size=3&status=6`)
            .then(response => this.setState({projects: response.data}))
    };

    render() {
        return (
            <div>
                <Container>
                    <CardDeck className="d-flex justify-content-around">
                        {this.state.projects.map(project => (
                            <SuccessfulProjectItem project={project}/>
                        ))}
                    </CardDeck>
                </Container>
            </div>
        )
    }
}
