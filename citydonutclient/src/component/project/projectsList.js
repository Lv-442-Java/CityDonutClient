import React from 'react';
import { Container } from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import { ProjectsItem } from './projectsItem';

export class ProjectsList extends React.Component {
    render() {
        return (
            <div>
                    <CardDeck className="d-flex justify-content-around">
                        {this.props.projects.map(element => (
                            <ProjectsItem
                                key={element.id}
                                id={element.id}
                                name={element.name}
                                categories={element.categories}
                                status={element.projectStatusDto}
                                moneyNeeded={element.moneyNeeded}
                            />
                        ))}
                    </CardDeck>
            </div>
        );
    }
}
