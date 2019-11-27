import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import {ProjectsItem} from './projectsItem';
import {Button} from "react-bootstrap";

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
                <br/>
                <Button style={{width: '99%'}} onClick={this.props.showMore} variant="secondary"
                        hidden={this.props.projects.length % 6 > 0 || this.props.projects.length === 0}>БІЛЬШЕ</Button>
            </div>
        );
    }
}
