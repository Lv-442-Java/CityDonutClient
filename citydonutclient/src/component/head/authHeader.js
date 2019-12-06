import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import axios from '../../utils/services';

export class AuthHeader extends React.Component {
    state = {
        user: '',
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        axios.get('http://localhost:8091/api/v1/user', { withCredentials: true }).then(response => this.setState({ user: response.data }));
    };

    deleteCookie = () => {
        axios.get('http://localhost:8091/sign-out', { withCredentials: true });
    };

    render() {
        return (
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>{this.state.user.firstName}</Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                    <Dropdown.Item as={Link} to="/donates/projects">Мої донати</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/userprojects">Мої проекти</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/user">Редагувати профіль</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/" onClick={this.deleteCookie}>Вийти</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        );
    }
}
