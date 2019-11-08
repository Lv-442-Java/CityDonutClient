import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export class ProjectsFilter extends React.Component {

    state = {
        status: 1,
        statusName: "не вибране",
        moneyFrom: 10000,
        moneyTo: 30000,
        categories: [1]
    };

    setStatus = (event, e) => {
        console.log(event);
        console.log(e.target.innerText);
        this.setState(
            {
                status: parseInt(event),
                statusName: e.target.innerText
            },
            () => this.props.setFilters(this.state)
        );
    };

    render() {
        return (
            <div>
                <Dropdown onSelect={this.setStatus}>

                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.state.statusName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="1">1</Dropdown.Item>
                        <Dropdown.Item eventKey="2">2</Dropdown.Item>
                        <Dropdown.Item eventKey="3">3</Dropdown.Item>
                        <Dropdown.Item eventKey="4">збір коштів</Dropdown.Item>
                        <Dropdown.Item eventKey="5">реалізація</Dropdown.Item>
                        <Dropdown.Item eventKey="6">виконаний</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}
