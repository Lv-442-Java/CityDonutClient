import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import axios from '../../utils/services';
import { ProjectsItem } from './projectsItem';

export default class DonatedProjects extends React.Component {
    state = {
        donatedProject: [],
    };

    componentDidMount() {
        this.getDonatedProjects();
    }

    getDonatedProjects = () => (
        axios.get('http://localhost:8091/api/v1/donates/projects/users/', { withCredentials: true }).then((response) => {
            this.setState({
                donatedProject: response.data,
            });
        })
    );

    render() {
        return (
            <div>
                <Container>
                    <h1 className="d-flex justify-content-center p-5">Ваші внески</h1>
                    <CardDeck className="d-flex justify-content-around">
                        {this.state.donatedProject.map(element => (
                            <ProjectsItem
                                key={element.id}
                                id={element.id}
                                name={element.name}
                                categories={element.categories}
                                status={element.projectStatusDto}
                                moneyNeeded={element.moneyNeeded}
                                donateSum={element.donateSum}
                                donateCount={element.donateCount}
                            />
                        ))}
                    </CardDeck>
                </Container>
            </div>
        );
    }
}
