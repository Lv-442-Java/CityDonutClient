import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from '../../utils/services';
import { FreeProjectsItem } from './FreeProjectsItem';
import Container from "react-bootstrap/Container";

export class FreeProjectsList extends React.Component {
    state = {
        projects: [],
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('http://localhost:8091/api/v1/projects/free', { withCredentials: true }).then(
            (response) => {
                this.setState({ projects: response.data });
                console.log(response.data);
            },
        );
    };

    render() {
        return (
            <div>
                <h1 className="d-flex justify-content-center p-5">Вільні проекти</h1>
                <CardDeck className="d-flex justify-content-around">
                    {this.state.projects.map(element => (
                        <FreeProjectsItem
                            key={element.id}
                            id={element.id}
                            name={element.name}
                            categories={element.categories}
                        />
                    ))}
                </CardDeck>
            </div>
        );
    }
}
