import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import queryString from 'query-string'

export class ProjectsFilter extends React.Component {

    state = {
        statusesAfterValidation: [],
        allCategories: [],
        maxMoneyNeeded: null
    };

    componentDidMount() {
        const values = queryString.parse(this.props.startLink);
        this.setStartFilters(values,() => {this.props.setFilters(this.state)});
        this.getStatuses();
        this.getMaxMoney();
        this.getCategories();
    }

    setStartFilters = (startFilters) => {
        this.setState(
            {
                page: startFilters.page === undefined ? 0 : startFilters.page,
                size: startFilters.size === undefined ? 6 : startFilters.size,
                status: startFilters.status === undefined ? null : startFilters.status,
                moneyFrom: startFilters.moneyFrom === undefined ? null : startFilters.moneyFrom,
                moneyTo: startFilters.moneyTo === undefined ? null : startFilters.moneyTo,
                categories: startFilters.categories === undefined ? [] :
                    startFilters.categories.split(",").map(id => parseInt(id)),
            }, () => {
                this.props.setFilters(this.state);
            }
        );
    };

    setStatusName = () => {
        this.state.statusesAfterValidation.map(status => {
            status.id == this.state.status && this.setState({statusName: status.status});
        });
        this.state.statusName === undefined && this.setState({statusName: "статус проекту"});
    };

    setStatus = (event, e) => {
        this.setState(
            {
                status: event === null ? event : parseInt(event),
                statusName: e.target.innerText,
            }, () => this.props.setFilters(this.state)
        );
    };

    setMoneyFrom = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = '';
            return;
        }
        this.setState(
            {
                moneyFrom: e.target.value === "" ? null : e.target.value,
            },
            () => this.props.setFilters(this.state)
        );
    };

    setMoneyTo = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = '';
            return;
        }
        this.setState(
            {
                moneyTo: e.target.value === "" ? null : e.target.value,
            },
            () => this.props.setFilters(this.state)
        );
    };

    getStatuses = () => {
        axios.get(`http://localhost:8091/api/v1/status/afterValidation`)
            .then(response => this.setState({statusesAfterValidation: response.data},
                () => this.setStatusName()));
    };

    getMaxMoney = () => {
        axios.get(`http://localhost:8091/api/v1/maxMoney`)
            .then(response => this.setState({maxMoneyNeeded: response.data}));
    };

    getCategories = () => {
        axios.get(`http://localhost:8091/api/v1/category/all`)
            .then(response => this.setState({allCategories: response.data}));
    };

    setCategories = (event) => {
        let newCategories = [];
        newCategories.push(...this.state.categories);
        event.target.checked ? newCategories.push(parseInt(event.target.id)) :
            newCategories = newCategories.filter(elem => {
                return elem !== parseInt(event.target.id)
            });
        this.setState(
            {
                categories: newCategories,
            },
            () => this.props.setFilters(this.state)
        );
    };

    render() {
        return (
            <div>
                <br></br>
                <p>СТАТУС ПРОЕКТУ</p>
                <Dropdown onSelect={this.setStatus}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {this.state.statusName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {this.state.statusesAfterValidation.map((item) =>
                            <Dropdown.Item eventKey={item.id}>{item.status}</Dropdown.Item>
                        )}
                        <Dropdown.Item eventKey={null}>статус проекту</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br></br>

                <p>НЕОБХІДНІ КОШТИ</p>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>₴</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Amount (to the nearest dollar)" placeholder="від 0"
                                 onInput={this.setMoneyFrom}
                                 value={this.state.moneyFrom !== null ? this.state.moneyFrom : ""}/>
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>₴</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Amount (to the nearest dollar)"
                                 placeholder={"до " + this.state.maxMoneyNeeded}
                                 onInput={this.setMoneyTo}
                                 value={this.state.moneyTo !== null ? this.state.moneyTo : ""}/>
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <p>КАТЕГОРІЇ</p>
                <ListGroup>
                    {this.state.allCategories.map((category) =>
                        <ListGroup.Item action variant="light">
                            <Form>
                                <Form.Check type="checkbox" id={category.id} label={category.category}
                                            onChange={this.setCategories}
                                            defaultChecked={this.state.categories.includes(category.id)}/>
                            </Form>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        )
    }
}
