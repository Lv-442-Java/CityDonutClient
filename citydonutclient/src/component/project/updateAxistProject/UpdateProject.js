import React from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import GoogleLocation from "../createNewProject/GoogleLocation";

export default class UpdateProject extends React.Component {
        state = {
            id: 1,
                creationDate : '',
                name : '',
                description : '',
                moneyNeeded : 0,
                location : '',

                areDocumentsValid : false,
                arePhotosValid : false,
                descriptionValid: false,
                locationValid : false,
                moneyNeededValid : false,
                nameValid :false

    }



    getProjectData = () => {
        axios.get(`http://localhost:8080/api/v1/project/${this.state.id}`,
            {withCredentials: true})
                .then(response => {
                    this.setState({...response.data} )
                })
    };

    getFieldsCheck = () => {
        axios.get(`http://localhost:8080/api/v1/fieldsCheck/get/${this.state.id}`,
            {withCredentials: true})
            .then(response => {
                this.setState(
                {...response.data[0] }
                )
            })
    };



    componentDidMount() {
        this.getProjectData();
        this.getFieldsCheck();


    }

    render() {
        return (
            <div>

                <Modal.Dialog>
                    <Modal.Title>Розгляд проекту: </Modal.Title>

                    <Modal.Body>

                        <label htmlFor="projectName">Назва проекту :</label>
                        <input
                            type="text"
                            name="projectName"
                            className="form-control"
                            defaultValue={this.state.name}
                            readOnly={this.state.nameValid}
                        />


                        <label htmlFor="projectDescription">Опис проекту :</label>
                        <textarea
                            className="form-control"
                            name="projectDescription"
                            value={this.state.description}
                            readOnly={this.state.descriptionValid}
                            style={{
                                resize:'none',
                                width: '100%',
                                height: '60px',
                                padding: '12px 20px',
                                margin: '8px 0',
                                display: 'inline-block',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box'}}/>

                        <label htmlFor="projectPrice">Необхідні кошти для реалізації проекту :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="projectPrice"
                            value={this.state.moneyNeeded}
                            readOnly={this.state.moneyNeededValid}/>

                        <label >Адреса :</label>
                        <GoogleLocation id="pLocation"   setPlace={this.setPlace} />
                        {/*<input*/}
                        {/*    className="form-control"*/}
                        {/*    value={this.state.location}*/}
                        {/*    readOnly={this.state.locationValid}*/}
                        {/*/>*/}

                        <label > Необхідні документи :</label>
                        <div>

                        </div>


                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary">Підтвердити</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>

        )
    }
}