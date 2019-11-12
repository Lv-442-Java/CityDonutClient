import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormText from "react-bootstrap/FormText";

export class ChangePassword extends React.Component {

    state = {
        exception:{
            "incorrectPassword": false,
            "incorrectNewPassword": false,
            "incorrectConfirmPassword": false,
            ""

        }
    }

    render() {
        return (
            <div className="d-flex justify-content-center align-items-center " style ={{minHeight:'100vh'}}>
                <Form className="d-flex justify-content-around flex-column align-items-center " style={{
                    width: '400px',
                    border: '2px solid gray',
                    borderRadius: '10px',
                    minHeight: '400px'
                }} >
                    <div><h2>Зміна паролю:</h2></div>
                    <div className='d-flex flex-column justify-content-around align-items-center' style={{width:'80%',border: '2px solid green'}}>
                        <FormGroup className ='d-flex justify-content-around flex-column align-items-center' controlId="oldPassword" style={{width:'80%', border: '2px solid red'}}>
                            <FormLabel>Старий пароль:</FormLabel>
                            <FormText ><p style = {{color: 'red'}}>Excedfsdfasdfasdfsdfasdfjgfs</p></FormText>
                            <FormControl type="password" placeholder="Старий пароль"></FormControl>
                        </FormGroup>
                        <FormGroup className ='d-flex flex-column justify-content-around align-items-center' controlId="newPassword" style={{width:'80%' , border: '2px solid red'}}>
                            <FormLabel>Новий пароль:</FormLabel>
                            <FormText ><p style = {{color: 'red'}}>Excedfsdfasdfasdfsdfasdfjgfs</p></FormText>
                            <FormControl type="password" placeholder="Новий пароль"></FormControl>
                        </FormGroup>
                        <FormGroup className ='d-flex flex-column justify-content-around align-items-center' controlId="confirmPassword" style={{width:'80%' , border: '2px solid red'}}>
                            <FormLabel>Підтвердження паролю:</FormLabel>
                            <FormText ><p style = {{color: 'red'}}>Excedfsdfasdfasdfsdfasdfjgfs</p></FormText>
                            <FormControl type="password" placeholder="Підтвердження паролю"></FormControl>
                        </FormGroup>
                    </div>
                    <div>
                        <Button variant="primary" type="submit" style={{heigth:'15%'}}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }

}



/*
{<Modal.Dialog>
    <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        <div>
            <label> Старий пароль:</label>
            <input placeholder="Old password" type="password" name="oldPassword" pattern="^(?=.*[A-Z].*[A-Z])(?=.*[._!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$" />
        </div>
        <div>
            <label> Новий пароль:</label>
            <input placeholder="New password" type="password" name="newPassword" pattern="^(?=.*[A-Z].*[A-Z])(?=.*[._!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$" />
        </div>
        <div>
            <label> Підтвердження паролю:</label>
            <input placeholder="Confirm password" type="password" name="confirmPassword" pattern="^(?=.*[A-Z].*[A-Z])(?=.*[._!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$" />
        </div>
    </Modal.Body>

    <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
    </Modal.Footer>
</Modal.Dialog>}*/
