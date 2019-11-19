import React from 'react';
import {SuccessfulProjectItem} from "./successfulProjectItem";
import CardDeck from "react-bootstrap/CardDeck";
import {Container} from "react-bootstrap";

export class SuccessfulProjectsList extends React.Component {
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
