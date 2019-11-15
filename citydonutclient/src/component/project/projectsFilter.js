import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

export class ProjectsFilter extends React.Component {

    state = {
        page: 0,
        size: 6,
        status: null,
        moneyFrom: null,
        moneyTo: null,
        categories: [],
        statusName: 'статус проекту',
        statusesAfterValidation: [],
        allCategories: [],
        maxMoneyNeeded: null,
    };

    componentDidMount() {
        this.getStatuses();
        this.getMaxMoney();
        this.getCategories();
    }

    setStatus = (event, e) => {
        this.setState(
            {
                status: event === null ? event : parseInt(event),
                statusName: e.target.innerText,
            }, () => this.props.setFilters(this.state),
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
                moneyTo: e.target.value === '' ? null : e.target.value,
            },
            () => this.props.setFilters(this.state),
        );
    };

    getStatuses = () => {
        axios.get('http://localhost:8091/api/v1/status/afterValidation')
            .then(response => this.setState({ statusesAfterValidation: response.data }));
    };

    getMaxMoney = () => {
        axios.get('http://localhost:8091/api/v1/maxMoney')
            .then(response => this.setState({ maxMoneyNeeded: response.data }));
    };

    getCategories = () => {
        axios.get('http://localhost:8091/api/v1/category/all')
            .then(response => this.setState({ allCategories: response.data }));
    };

    setCategories = (event, e) => {
        let newCategories = this.state.categories.slice();
        if (event.target.checked) {
            newCategories.push(event.target.id);
        } else {
            newCategories = newCategories.filter(elem => elem !== event.target.id);
        }
        this.setState(
            {
                categories: newCategories,
            },
            () => this.props.setFilters(this.state),
        );
    };

    render() {
        const items = this.state.statusesAfterValidation.map(item => <Dropdown.Item eventKey={item.id}>{item.status}</Dropdown.Item>);

        const categories = this.state.allCategories.map(category => (
            <ListGroup.Item action variant="light">
                <Form>
                    <Form.Check type="checkbox" id={category.id} label={category.category}
                                onChange={this.setCategories}/>
                </Form>
            </ListGroup.Item>
        ));

        return (
            <div>
                <br />
                <Dropdown onSelect={this.setStatus}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {this.state.statusName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {items}
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
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <p>КАТЕГОРІЇ</p>
                <ListGroup>
                    {categories}
                </ListGroup>
            </div>
        );
    }
}
