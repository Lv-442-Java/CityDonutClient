import React from "react";
import {GoogleComponent} from 'react-google-location';
import {API_KEY} from "./MyCustomMap";

export default class PlaceComponent extends React.Component {

    state = {
        place: null
    };

    render() {
        return (
            <div>
                <GoogleComponent
                    apiKey={API_KEY}
                    language={'uk'}
                    country={'country:in|country:ukr'}
                    coordinates={true}
                    // locationBoxStyle={'custom-style'}
                    // locationListStyle={'custom-style-list'}
                    // onChange={this.props.setPlace}
                />
            </div>
        )
    }
}