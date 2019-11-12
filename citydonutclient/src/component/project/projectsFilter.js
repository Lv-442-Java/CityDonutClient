import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

export class ProjectsFilter extends React.Component {

    statusesAfterValidation = [];
    allCategories = [];
    maxMoneyNeeded;

    state = {
        page: 0,
        size: 6,
        status: "default",
        moneyFrom: 0,
        moneyTo: "default",
        categories: ["default"],
        statusName: "статус проекту",
    };

    setStatus = (event, e) => {
        this.setState(
            {
                status: event === "default" ? event : parseInt(event),
                statusName: e.target.innerText
            },
            () => this.props.setFilters(this.state)
        );
    };

    setMoneyFrom = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = '';
            return;
        }
        this.setState(
            {
                moneyFrom: e.target.value === "" ? 0 : e.target.value,
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
                moneyTo: e.target.value === "" ? 0 : e.target.value,
            },
            () => this.props.setFilters(this.state)
        );
    };

    getStatuses = () => {
        axios.get(`http://localhost:8091/api/v1/status/afterValidation`)
            .then(response => this.statusesAfterValidation = response.data)
    };

    getMaxMoney = () => {
        axios.get(`http://localhost:8091/api/v1/maxMoney`).then(response => this.maxMoneyNeeded = response.data)
    };

    getCategories = () => {
        axios.get(`http://localhost:8091/api/v1/category/all`).then(response => this.allCategories = response.data)
    };

    setCategories = (event, e) => {
        let newCategories = this.state.categories.slice();
        if (newCategories[0] === "default") {
            newCategories = newCategories.splice(0, newCategories.length - 1);
        }
        if (event.target.checked) {
            newCategories.push(event.target.id);
        } else {
            newCategories = newCategories.filter(elem => {
                return elem !== event.target.id
            })
        }
        if (newCategories.length === 0) {
            newCategories.push("default");
        }
        this.setState(
            {
                categories: newCategories,
            },
            () => this.props.setFilters(this.state)
        );
    };

    render() {
        this.getStatuses();
        const items = this.statusesAfterValidation.map((item) =>
            <Dropdown.Item eventKey={item.id}>{item.status}</Dropdown.Item>
        );

        this.getCategories();
        const categories = this.allCategories.map((category) =>
            <ListGroup.Item action variant="light">
                <Form>
                    <Form.Check type="checkbox" id={category.id} label={category.category}
                                onChange={this.setCategories}/>
                </Form>
            </ListGroup.Item>
        );

        this.getMaxMoney();

        return (
            <div>
                <br></br>
                <Dropdown onSelect={this.setStatus}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {this.state.statusName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {items}
                        <Dropdown.Item eventKey="default">статус проекту</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br></br>

                <p>НЕОБХІДНІ КОШТИ</p>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>₴</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Amount (to the nearest dollar)" placeholder="від 0"
                                 onInput={this.setMoneyFrom}/>
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>₴</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Amount (to the nearest dollar)" placeholder={"до " + this.maxMoneyNeeded}
                                 onInput={this.setMoneyTo}/>
                    <InputGroup.Append>
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <p>КАТЕГОРІЇ</p>
                <ListGroup>
                    {categories}
                </ListGroup>
            </div>
        )
    }
}