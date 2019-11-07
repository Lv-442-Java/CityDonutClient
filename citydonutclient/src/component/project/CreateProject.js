import React from 'react';

import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button";

export class CreateProject extends React.Component{

    render() {
        return(

            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Створити проект</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <label> Назва проекту:</label>
                        <input type="text" name="projectName" pattern="[A-Za-z]{3}" title="Three letter country code" />
                    </div>
                    <div>
                        <label>Опис:</label>
                        <input type="area" name="description"/>
                    </div>
                    <div>
                        <label>Загрузити файли:</label>
                        <input type="file" name="fileLoad"/>
                    </div>
                    <div>
                        <label> Добавити локацію:</label>

                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Очистити</Button>
                    <Button variant="primary">Подати</Button>
                </Modal.Footer>
            </Modal.Dialog>



        )
    }

}