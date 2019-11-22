import React from "react";
import axios from "axios";
import CardDeck from "react-bootstrap/CardDeck";
import {ProjectsItem} from "./projectsItem";
import Container from "react-bootstrap/Container";

export default class DonatedProjects extends React.Component {

    state = {
        donatedProject: []
    };

    getDonatedProjects = () => (
        axios.get(`http://localhost:8091/api/v1/donates/projects/users/`, {withCredentials: true}).then(response => {
            this.setState({
                donatedProject: response.data
            })
        })
    );

    componentDidMount() {
        this.getDonatedProjects();
    }

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
                                donateSum ={element.donateSum}
                                donateCount={element.donateCount}
                            />
                        ))}
                    </CardDeck>
                </Container>
            </div>
        )
    }
}


