import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import axios from 'axios';

export class AuthHeader extends React.Component {
    state = {
        user: ''
    };

    getUser = () => {
        axios.get(`http://localhost:8091/api/v1/user`, {withCredentials: true}).then(response =>
            // console.log(response.data.firstName)
            this.setState({user: response.data})
        )
    };

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>{this.state.user.firstName}</Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                    <Dropdown.Item as={Link} to="/login">Мої донати</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/login">Мої проекти</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/login">Редагувати профіль</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item as={Link} to="/login">Вийти</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        );
    }
}
