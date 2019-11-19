import React from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

export const API_KEY = 'AIzaSyCzRGiyExLsjai7JXtonhb1AX7VMXsV-30';

export default class MyCustomMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            MyMap: this.createMap([]),
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + API_KEY,
            center: {
                lat: 49.839681,
                lng: 24.029720
            },
            zoom: 16
        }
    }


    createMap = (places) => withScriptjs(withGoogleMap(props =>

            <GoogleMap
                defaultZoom={this.state.zoom}
                defaultCenter={{lat: this.state.center.lat, lng: this.state.center.lng}}>
                <Marker
                    position={{ lat: this.props.location.coordinates.lat, lng: this.props.location.coordinates.lng }}
                />
            </GoogleMap>
    ));
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log("did mount")
        if(this.props.location !== prevProps.location && this.props.location.coordinates.lat){
            this.setState({
                center: this.props.location.coordinates,
                MyMap:this.createMap(this.props.location.coordinates)
            })
        }
    }

    render() {
        return (
            <div>
                <this.state.MyMap
                    googleMapURL={this.state.googleMapURL}
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `400px`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                >
                </this.state.MyMap>
            </div>
        );
    }
}
