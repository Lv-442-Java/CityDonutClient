import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";
import logo from '../../img/icon.jpg';

export class Head extends React.Component {

    state = {};

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to='/'>
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    /> {' '} CityDonut
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex w-75 justify-content-around">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        <Nav.Link as={Link} to='/project/create'>Create Project</Nav.Link>
                        <Nav.Link as={Link} to='/projects'>Projects</Nav.Link>
                        <Nav.Link as={Link} to='/registration'>Реєстрація</Nav.Link>
                    </Nav>
                    {/*<Form inline>*/}
                    {/*    <FormControl type="text" placeholder="Search" className="mr-2"/>*/}
                    {/*    <Button variant="outline-info">Search</Button>*/}
                    {/*</Form>*/}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
