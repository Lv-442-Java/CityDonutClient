import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import MyCustomMap from "./MyCustomMap";
import GoogleLocation from "./GoogleLocation";
import axios from "axios";


export class CreateProject extends React.Component {

    state = {
        file : undefined,
        street: {
            place: '',
            coordinates: {
                lat: 0,
                lng: 0
            },
            "name": undefined,
            "description": undefined,
            "moneyNeeded": 0
        }
    };

    setFile =(e)=>{
        this.setState({file:e.target.value})
    };

    setName = (e) => {
        this.setState({name: e.target.value});
    };
    setDescription = (e) => {
        this.setState({description: e.target.value});
    };
    setMoney = (e) => {
        this.setState({moneyNeeded: parseFloat(e.target.value)});
    };

    setPlace = (place) => {
        this.setState({
            street: {
                place: place.place,
                coordinates: {
                    lat: parseFloat(place.coordinates.lat),
                    lng: parseFloat(place.coordinates.lng)
                }
            }
        })
    };
    sendData = () => {
        let data = {
            "name": this.state.name,
            "description": this.state.description,
            "location": this.state.street.place,
            "locationLatitude": this.state.street.coordinates.lat,
            "locationLongitude": this.state.street.coordinates.lng,
            "moneyNeeded": this.state.moneyNeeded,
            "categories": [{category: 'спорт'}]
        }
        let file ={
            "file" : this.state.file

        }
        console.log(file);
        console.log(data);

        axios.post(`http://localhost:8080/api/v1/project`,
            data,
            {withCredentials: true})
            .then(response => {
                console.log(response.data)
                axios.post(`http://localhost:8080/api/v1/project/${response.data.id}/uploadMultipleFiles`,
                    file,
                    {withCredentials: true}).then(response => console.log(response.data))

            })



};

render()
{
    return (
        <Modal.Dialog style={{width: '600px', height: '500'}}>
            <Modal.Header closeButton>
                <Modal.Title style={{textAlign: 'center'}}>Створити проект</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <div style={{width: '100%'}}>
                    <label htmlFor="pName"> Назва проекту:</label>
                    <input type="text"
                           id="pName"
                           name="name"
                           placeholder="Назва проекту..."
                           style={{
                               width: '100%',
                               padding: '12px 20px',
                               margin: '8px 0',
                               display: 'inline-block',
                               border: '1px solid #ccc',
                               borderRadius: '4px'

                           }}
                           onChange={this.setName}/>

                    <label htmlFor="pDescription">Опис:</label>
                    <input type="area"
                           id="pDescription"
                           name="description"
                           placeholder="Про проект..."
                           style={{
                               width: '100%',
                               height: '100px',
                               padding: '12px 20px',
                               margin: '8px 0',
                               display: 'inline-block',
                               border: '1px solid #ccc',
                               borderRadius: '4px',
                               boxSizing: 'border-box'
                           }}
                           onChange={this.setDescription}/>
                    <label htmlFor="projectPrice">Необхідні кошти для реалізації проекту :</label>
                    <input
                        type="text"
                        className="form-control"
                        name="projectPrice"
                        onChange={this.setMoney}/>

                    <label htmlFor="pLocation">Адреса :</label>
                    <GoogleLocation id="pLocation" setPlace={this.setPlace}/>

                    <input type="file"
                           id="pFile"
                           name="fileLoad"
                           style={{margin: '10px 0px 60px 60px'}}
                           formEncType="multipart/form-data"
                           onChange={this.setFile}
                    />
                </div>

                <div style={{
                    height: '400px',
                    width: '350px',
                    margin: '30px 0px 60px 60px'
                }}>

                    <MyCustomMap style={{width: '300px', height: "300px"}} location={this.state.street}>
                    </MyCustomMap>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={this.sendData}>Надіслати</Button>
            </Modal.Footer>
        </Modal.Dialog>


    );
}
}

export default CreateProject;
