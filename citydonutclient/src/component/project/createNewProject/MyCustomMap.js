// import React from "react";
// import {GoogleMap,
//         withScriptjs,
//         withGoogleMap,
//         Marker} from 'react-google-maps';
//
//
// export const API_KEY = 'AIzaSyAS45zUCfvjgf1ebJTN_lTouV-CPjXMArQ';
//
//
// export default class  MyCustomMap extends React.Component{
//     static defaultProps = {
//         googleMapURL:"https://maps.googleapis.com/maps/api/js?key="+API_KEY ,
//         center: {
//             lat: 49.839681,
//             lng: 24.029720,
//         },
//         zoom: 1
//     };
//     // constructor(props){
//     //     super(props)
//     //     this.state = {
//     //         MyMap: this.createMap([])
//     //     }
//     // }
//
//     createMap = (plases) => withScriptjs(withGoogleMap(props =>
//         <GoogleMap
//             defaultZoom={16}
//             defaultCenter={{ lat: 49.839681, lng: 24.029720 }}>
//
//             plases.map(element => <Marker position={element.pl} />)
//         </GoogleMap>
//
//     ));
//     componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
//         if(this.props.places !== prevProps.places){
//             this.setState({MyMA})
//         }
//
//     }
//
//     render() {
//         let location = this.props.location;
//
//         return (
//             <div>
//                 <this.MyMap
//                     googleMapURL={this.props.googleMapURL}
//                     loadingElement={<div style={{ height: `100%` }} />}
//                     containerElement={<div style={{ height: `400px` }} />}
//                     mapElement={<div style={{ height: `100%` }} />}
//                 >
//
//
//                 </this.MyMap>
//             </div>
//         );
//     }
// }
