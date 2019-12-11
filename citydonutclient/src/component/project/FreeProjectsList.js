import React from 'react';
import axios from '../../utils/services';
import {FreeProjectsItem} from "./FreeProjectsItem";
import CardDeck from "react-bootstrap/CardDeck";

export class FreeProjectsList extends React.Component {

    state = {
        projects: [],
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('http://localhost:8091/api/v1/projects/free', {withCredentials: true}).then(
            (response) => {
                this.setState({projects: response.data});
                console.log(response.data)
            }
        )
    };

    render() {
        console.log(this.state.projects);
        return (
            <div>
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
