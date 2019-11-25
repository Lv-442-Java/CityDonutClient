import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Marker } from 'react-google-maps';
import GoogleMap from './GoogleMap';
import GoogleLocation from './GoogleLocation';


export class CreateProject extends React.Component {
    render() {
        return (
            <Modal.Dialog style={{ width: '600px', height: '500' }}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign: 'center' }}>Створити проект</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div style={{ width: '100%' }}>
                        <label htmlFor="pName"> Назва проекту:</label>
                        <input
                            type="text"
                            id="pName"
                            name="projectName"
                            placeholder="Назва проекту..."
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                margin: '8px 0',
                                display: 'inline-block',
                                border: '1px solid #ccc',
                                borderRadius: '4px',

                            }}/>

                        <label htmlFor="pDescription">Опис:</label>
                        <input
                            type="area"
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
                                boxSizing: 'border-box',

                            }}/>

                        <label htmlFor="pFile">Загрузити файли:</label>
                        <input type="file" id="pFile" name="fileLoad" />
                    </div>

                    <div style={{
                        height: '400px',
                        width: '350px',
                        margin: '50px 0px 60px 60px',
                    }}>
                        <GoogleMap />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary">Надіслати</Button>
                </Modal.Footer>
                <GoogleLocation />
            </Modal.Dialog>


        );
    }
}

export default CreateProject;
