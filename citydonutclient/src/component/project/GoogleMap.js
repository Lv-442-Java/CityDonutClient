import React from 'react';
import GoogleMapReact from 'google-map-react';

export const API_KEY = 'AIzaSyBJCnJQfuE3uB1KPccD7Sm-4Upo4NIlUxE';

export default class GoogleMap extends React.Component {
    static defaultProps = {
        center: {
            lat: 49.839681,
            lng: 24.029720,
        },
        zoom: 11,
    };

    render() {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            />
        );
    }
}
