import React from "react";
import { GoogleComponent } from 'react-google-location' ;
import GoogleMap,{API_KEY} from "./GoogleMap";

export default class  LocationComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            place : null
        };
    }
    render(){
        return(
            <GoogleComponent>
                apiKey={API_KEY}
                language={'en'}
                country={'country:in|country:us'}
                coordinates={true}
                {/*locationBoxStyle={'custom-style'}*/}
                {/*locationListStyle={'custom-style-list'}*/}
                onChange={(e) => { this.setState({ place: e }) }} />
            </GoogleComponent>

        )
    }


}