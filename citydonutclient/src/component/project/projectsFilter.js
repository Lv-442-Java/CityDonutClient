import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import queryString from 'query-string';

export class ProjectsFilter extends React.Component {
    state = {
        statusName: 'статус проекту',
        statuses: [],
        allCategories: [],
        timeout: null,
    };

    componentDidMount() {
        const values = queryString.parse(this.props.startLink);
        this.setStartFilters(values, () => {
            this.props.setFilters(this.state);
        });
        this.getStatuses();
        this.getMaxMoney();
        this.getCategories();
    }

    setStartFilters = (startFilters) => {
        this.setState(
            {
                status: startFilters.status,
                moneyFrom: startFilters.moneyFrom,
                moneyTo: startFilters.moneyTo,
                categories: startFilters.categories === undefined ? []
                    : startFilters.categories.split(',').map(id => parseInt(id, 10)),
            }, () => {
                this.props.setFilters(this.state);
            },
        );
    };

    setStatusName = () => {
        this.state.statuses.forEach((status) => {
            status.id === parseInt(this.state.status, 10)
                && this.setState({ statusName: status.status });
        });
    };

    setStatus = (event, e) => {
        this.setState(
            {
                status: event === null ? undefined : parseInt(event, 10),
                statusName: e.target.innerText,
            }, () => this.props.setFilters(this.state),
        );
    };

    setMoney = (event, key) => {
        if (Number.isNaN(event.target.value)) {
            event.target.value = '';
        } else {
            this.setState(
                {
                    [key]: event.target.value === '' ? undefined : event.target.value,
                },
                () => {
                    clearTimeout(this.state.timeout);
                    this.setState({
                        timeout: setTimeout(() => {
                            this.props.setFilters(this.state);
                        }, 1000),
                    });
                },
            );
        }
    };

    setMoneyFrom = (event) => {
        this.setMoney(event, 'moneyFrom');
    };

    setMoneyTo = (event) => {
        this.setMoney(event, 'moneyTo');
    };

    getStatuses = () => {
        if (this.props.isOwner) {
            axios.get('http://localhost:8091/api/v1/status/all')
                .then(response => this.setState({ statuses: response.data },
                    () => this.setStatusName()));
        } else {
            axios.get('http://localhost:8091/api/v1/status/afterValidation')
                .then(response => this.setState({ statuses: response.data },
                    () => this.setStatusName()));
        }
    };

    getMaxMoney = () => {
        axios.get('http://localhost:8091/api/v1/maxMoney')
            .then(response => this.setState({ maxMoneyNeeded: response.data }));
    };

    getCategories = () => {
        axios.get('http://localhost:8091/api/v1/category/all')
            .then(response => this.setState({ allCategories: response.data }));
    };

    setCategories = (event) => {
        let newCategories = [];
        newCategories.push(...this.state.categories);
        event.target.checked ? newCategories.push(parseInt(event.target.id, 10))
            : newCategories = newCategories.filter(elem => elem !== parseInt(event.target.id, 10));
        this.setState(
            {
                categories: newCategories,
            },
            () => this.props.setFilters(this.state),
        );
    };

    render() {
        return (
            <div>
                <br />
                <p>СТАТУС ПРОЕКТУ</p>
                <Dropdown onSelect={this.setStatus}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {this.state.statusName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {this.state.statuses.map(item => (
                            <Dropdown.Item eventKey={item.id}>
                                {item.status}
                            </Dropdown.Item>
                        ))}
                        <Dropdown.Item eventKey={null}>статус проекту</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br />

                <p>НЕОБХІДНІ КОШТИ</p>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>₴</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-label="Amount (to the nearest dollar)"
                        placeholder="від 0"
                        onInput={this.setMoneyFrom}
                        value={this.state.moneyFrom !== undefined ? this.state.moneyFrom : ''}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>₴</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-label="Amount (to the nearest dollar)"
                        placeholder={`до ${this.state.maxMoneyNeeded}`}
                        onInput={this.setMoneyTo}
                        value={this.state.moneyTo !== undefined ? this.state.moneyTo : ''}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <p>КАТЕГОРІЇ</p>
                <ListGroup>
                    {this.state.allCategories.map(category => (
                        <ListGroup.Item action variant="light">
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    id={category.id}
                                    label={category.category}
                                    onChange={this.setCategories}
                                    defaultChecked={this.state.categories.includes(category.id)}
                                />
                            </Form>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        );
    }
}
