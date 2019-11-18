import React from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

export default class UpdateProject extends React.Component {
        state = {
            id: 1,
            project : {
                creationDate : '',
                name : '',
                description : '',
                moneyNeeded : 0,
                location : ''
            },
            fieldsCheck :{
                areDocumentsValid : '',
                arePhotosValid : false,
                descriptionValid: false,
                locationValid : false,
                moneyNeededValid : false,
                nameValid :false
            }
    }



    getProjectData = () => {
        axios.get(`http://localhost:8080/api/v1/project/${this.state.id}`,
            {withCredentials: true})
                .then(response => {
                    this.setState(
                        {project: response.data}
                    )
                    console.log("in project")
                })
    };

    getFieldsCheck = () => {
        axios.get(`http://localhost:8080/api/v1/fieldsCheck/get/${this.state.id}`,
            {withCredentials: true})
            .then(response => {
                this.setState(
                {fieldsCheck: response.data }
                )
                console.log("in field")
            })
    };



    componentDidMount() {
        this.getProjectData();
        this.getFieldsCheck();
    }

    render() {
        console.log(" In render")
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
                            defaultValue={this.state.project.name}
                            readOnly={true}
                        />


                        <label htmlFor="projectDescription">Опис проекту :</label>
                        <input
                            type="area"
                            className="form-control"
                            name="projectDescription"
                            value={this.state.project.description}
                            readOnly={true}/>

                        <label htmlFor="projectPrice">Необхідні кошти для реалізації проекту :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="projectPrice"
                            value={this.state.project.moneyNeeded}
                            readOnly={true}/>

                        <label >Адреса :</label>
                        <input
                            className="form-control"
                            value={this.state.project.location}
                            readOnly={true}
                        />

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