import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ScrollUpButton from 'react-scroll-up-button';
import axios from '../../utils/services';
import HomePagePhoto from './homePagePhoto';
import SuccessfulProjectsList from './successfulProjectsList';

export class Base extends React.Component {
    state = {
        projects1: [],
        projects2: [],

    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('http://localhost:8091/api/v1/project/filter?page=0&size=3&status=6')
            .then(response => this.setState({ projects1: response.data }));
        axios.get('http://localhost:8091/api/v1/project/filter?page=1&size=3&status=6')
            .then(response => this.setState({ projects2: response.data }));
    };

    getItems = () => {
        const result = [];
        this.state.projects1.length !== 0
        && result.push(<Carousel.Item className="text-center">
            <SuccessfulProjectsList
                projects={this.state.projects1}
            />
                       </Carousel.Item>);

        this.state.projects2.length !== 0
        && result.push(<Carousel.Item className="text-center">
            <SuccessfulProjectsList
                projects={this.state.projects2}
            />
                       </Carousel.Item>)

        && result.push(
            <Carousel.Item className="text-center">
                <SuccessfulProjectsList
                    projects={this.state.projects1}
                />
            </Carousel.Item>,
        );

        this.state.projects2.length !== 0
        && result.push(
            <Carousel.Item className="text-center">
                <SuccessfulProjectsList
                    projects={this.state.projects2}
                />
            </Carousel.Item>,
        );


        if (result.length !== 0) {
            return <Carousel style={{ 'background-color': 'white' }}>{result}</Carousel>;
        }

        return result;
    };

    render() {
        return (

            <div>
                <HomePagePhoto id="containerId" />
                <div id="#container">
                    {this.getItems()}
                </div>
                <div>
                    <ScrollUpButton />
                </div>
            </div>
        );
    }
}
