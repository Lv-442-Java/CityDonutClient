import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from '../../../utils/services';
import GoogleLocation from '../createNewProject/GoogleLocation';
import MyCustomMap from '../createNewProject/MyCustomMap';

export default class UpdateProject extends React.Component {
    state = {
        id: this.props.projectId,
        creationDate: '',
        moneyNeeded: 0,
        allCategories: [],
        category: [],
        name: '',
        description: '',

        areDocumentsValid: false,
        arePhotosValid: false,
        descriptionValid: false,
        locationValid: false,
        moneyNeededValid: false,
        nameValid: false,
        categoryValid: false,

        street: {
            place: '',
            coordinates: {
                lat: 0,
                lng: 0,
            },
        },
    }

    setMoney = (e) => {
        this.setState({moneyNeeded: parseFloat(e.target.value)});
    };

    getProjectData = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.state.id}`,
            { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    creationDate: response.data.creationDate,
                    name: response.data.name,
                    description: response.data.description,
                    moneyNeeded: response.data.moneyNeeded,
                    street: {
                        place: response.data.location,
                        coordinates: {
                            lat: response.data.locationLatitude,
                            lng: response.data.locationLongitude,
                        },
                    },
                });
            })
            .then(() => {
                axios.get(`http://localhost:8091/api/v1/fieldsCheck/get/${this.state.id}`,
                    {withCredentials: true})
                    .then((response) => {
                        this.setState(
                            {...response.data[0]},
                        );
                    });

            })
    };

    componentDidMount() {
        this.getProjectData();
    };

    getApprovedLocation() {
        if (this.state.locationValid) {
            return (
                <div>
                    <label> Адреса:</label>
                    <br />
                    <input type="text" className="form-control" value={this.state.street.place} readOnly />
                </div>
            );
        }
        return (
            <div>
                <label>Адреса :</label>
                <GoogleLocation
                    id="pLocation"
                    className="form-control"
                    style={{ borderRadius: '4px' }}
                    setPlace={this.setPlace}
                />

                <div style={{
                    height: '400px',
                    width: '350px',
                    margin: '30px 0px 60px 60px',
                }}
                >

                    <MyCustomMap
                        style={{ width: '300px', height: '300px' }}
                        location={this.state.street}
                    />
                </div>
            </div>
        );
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
                                resize: 'none',
                                width: '100%',
                                height: '60px',
                                padding: '12px 20px',
                                margin: '8px 0',
                                display: 'inline-block',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                            }}
                        />

                        <label htmlFor="projectPrice">Необхідні кошти для реалізації проекту :</label>
                        <input
                            type="number"
                            className="form-control"
                            name="projectPrice"
                            min='1'
                            max='10000000000'
                            value={this.state.moneyNeeded}
                            readOnly={this.state.moneyNeededValid}
                            onChange={this.setMoney}
                        />

                        <label htmlFor="pFile">Додаткові матеріали :</label>
                        <br />

                        <label
                            htmlFor="file-upload"
                            style={{
                                border: '1px solid #ccc',
                                width: '200px',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                                padding: '6px 30px',
                                cursor: 'pointer',
                            }}
                        >
                            Загрузити файли
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            style={{ display: 'none', margin: '10px 0px 60px 60px' }}
                            multiple
                            onChange={this.setFile}
                        />

                        {this.getApprovedLocation()}

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary">Підтвердити</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}
