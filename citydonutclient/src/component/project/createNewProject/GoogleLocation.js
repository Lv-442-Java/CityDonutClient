import React from 'react';
import { GoogleComponent } from 'react-google-location';

export default class PlaceComponent extends React.Component {
    state = {
        place: null,
    };

    render() {
        return (
            <div>
                <GoogleComponent
                    apiKey="AIzaSyAdBH3M36kCWsJ4YlqMt9F22uW7Pz4IUY3"
                    language="uk"
                    country="country:in|country:ukr"
                    coordinates
                    onChange={this.props.setPlace}
                />
            </div>
        );
    }
}
