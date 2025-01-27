import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import logo from '../../img/icon.jpg';
import { AuthHeader } from './authHeader';

export class Head extends React.Component {
    cookiesToJson = () => Object.fromEntries(document.cookie.split(/; */).map((c) => {
        const [key, ...v] = c.split('=');
        return [key, decodeURIComponent(v.join('='))];
    }));

    state = {
        role:
            (this.cookiesToJson().JWT && jwt(this.cookiesToJson().JWT).roles),
    };


    isAuthorized = () => {
        const jwt = this.cookiesToJson().JWT;
        return jwt && jwt.length > 10;
    };

    linkToAddProject = () => (this.isAuthorized() ? '/project/create' : '/login');

    render() {
        console.log(this.state.role);
        return (
            <Navbar bg="dark" variant="dark" expand="lg" className="d-flex justify-content-between">
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    {' '}
                    CityDonut
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/projects">Проекти</Nav.Link>

                        {this.state.role === 'moderator'
                            ? <Nav.Link as={Link} to="/projects/free">Вільні проекти</Nav.Link>
                            : <Nav.Link as={Link} to={this.linkToAddProject}>Подати проект</Nav.Link>}

                        {/* <Nav.Link as={Link} to={this.linkToAddProject}>Подати проект</Nav.Link> */}
                        <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {this.isAuthorized()
                            ? <AuthHeader />
                            : <Nav.Link as={Link} to="/login">Увійти</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
