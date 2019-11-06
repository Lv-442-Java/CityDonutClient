import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";

export class Head extends React.Component {

    state = {};

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={Link} to='/'>  CityDonut</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        )
    }
}
