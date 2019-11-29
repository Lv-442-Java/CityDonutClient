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
        statusesAfterValidation: [],
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
                page: startFilters.page === undefined ? 0 : startFilters.page,
                size: startFilters.size === undefined ? 6 : startFilters.size,
                status: startFilters.status,
                moneyFrom: startFilters.moneyFrom,
                moneyTo: startFilters.moneyTo,
                categories: startFilters.categories === undefined ? []
                    : startFilters.categories.split(',').map(id => parseInt(id)),
            }, () => {
                this.props.setFilters(this.state);
            },
        );
    };

    setStatusName = () => {
        this.state.statusesAfterValidation.map((status) => {
            status.id == this.state.status && this.setState({ statusName: status.status });
        });
    };

    setStatus = (event, e) => {
        this.setState(
            {
                status: event === null ? undefined : parseInt(event),
                statusName: e.target.innerText,
            }, () => this.props.setFilters(this.state),
        );
    };

    setMoney = (event, key) => {
        if (isNaN(event.target.value)) {
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
        axios.get('http://localhost:8091/api/v1/status/afterValidation')
            .then(response => this.setState({ statusesAfterValidation: response.data },
                () => this.setStatusName()));
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
        event.target.checked ? newCategories.push(parseInt(event.target.id))
            : newCategories = newCategories.filter(elem => elem !== parseInt(event.target.id));
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
                        {this.state.statusesAfterValidation.map(item => <Dropdown.Item eventKey={item.id}>{item.status}</Dropdown.Item>)}
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
