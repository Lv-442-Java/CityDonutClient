import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import { Container } from 'react-bootstrap';
import { SuccessfulProjectItem } from './successfulProjectItem';

const SuccessfulProjectsList = props => (
    <div>
        <Container>
            <CardDeck className="d-flex justify-content-around">
                {props.projects.map(project => (<SuccessfulProjectItem project={project} />))}
            </CardDeck>
        </Container>
    </div>
);
export default SuccessfulProjectsList;
