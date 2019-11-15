import React from "react";
import {Button, Modal} from "react-bootstrap";
import GoogleLocation from "../createNewProject/GoogleLocation";
import axios from "axios";
import SimpleModelComponent from "./SimpleModelComponent";


export default class UpdateProject extends React.Component {
    state = {
        id: undefined,
        name: undefined,
        description: undefined,
        location: undefined,
        documents: [],
        userEmail: 'vanivsky.oleh.lv@gmail.com',
        password: 'user'
    };

    componentDidMount() {
        this.getData()
    }

    data = {"userEmail": this.state.userEmail,
        "password": this.state.password}


    getData = () => {
        axios.post('http://localhost:8080/sign-in',
            this.data,
            {withCredentials: true})
                .then(response => {
                    console.log(response.data);
                    this.setState({name: response.data}
                    )
                })
    };

    render() {
        return (

            <div>

                <Modal.Dialog>
                    <Modal.Title>Modal title</Modal.Title>

                    <Modal.Body>

                        <label htmlFor="pName">Назва проекту:</label>
                        <input type="text" name="name" className="form-control"/>

                        <label htmlFor="pDescription">Опис проекту:</label>
                        <input type="area" className="form-control" name="description" placeholder="Про проект..."/>

                        <label htmlFor="pLocation">Адреса :</label>
                        <GoogleLocation id="pLocation" className="form-control" setPlace={this.setPlace}/>

                        <label htmlFor="pLocation"> Необхідні документи :</label>
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