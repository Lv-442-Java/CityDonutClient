import React from 'react';
import { Link } from 'react-router-dom';
import { getExchangeCurentDay } from '../../services/exangeServices';

export class Base extends React.Component {
    state = {
        exchange: [],
    };

    componentDidMount() {
        this.getExchange();
    }

    getExchange = () => {
        getExchangeCurentDay()
            .then((res) => {
                this.setState({ exchange: res.data });
                console.log(res);
            }).catch(err => console.log('Error'));
    };

    render() {
        console.log(this.state.exchange);
        return (
            <div>
                {
                    this.state.exchange.map(element => (
                        <div key={element.r030}>
                            {element.txt}
                        </div>
                    ))
                }
                <h1>HOME!!!!!!</h1>
                <Link to="/login">LOGIN</Link>
            </div>
        );
    }
}
