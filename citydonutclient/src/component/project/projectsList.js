import React from "react";
import {ProjectsItem} from "./projectsItem";
import {Col, Container, Row} from "react-bootstrap";
import CardDeck from "react-bootstrap/CardDeck";

export class ProjectsList extends React.Component {

    render() {
        return (

            <div>
                <Container>
                    <CardDeck bsPrefix="card-deck d-flex justify-content-around">
                        {this.props.projects.map(element =>
                                <ProjectsItem key={element.id} id={element.id} name={element.name} categories={element.categories} status={element.projectStatusDto}/>
                        )}
                    </CardDeck>
                </Container>
            </div>
        )
    }
}
