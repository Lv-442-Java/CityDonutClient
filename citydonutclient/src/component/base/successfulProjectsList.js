import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import { Container } from 'react-bootstrap';
import { SuccessfulProjectItem } from './successfulProjectItem';

export class SuccessfulProjectsList extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <CardDeck className="d-flex justify-content-around">
                        {this.props.projects.map(project => (<SuccessfulProjectItem project={project} />))}
                    </CardDeck>
                </Container>
            </div>
        );
    }
}
