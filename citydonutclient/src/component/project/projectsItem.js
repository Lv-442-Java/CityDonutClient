import React from "react";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import axios from "axios";
import ProgressBar from "../progressBar/progressBar";

export class ProjectsItem extends React.Component {

    state = {
        donatesSum: 0,
        donatedPercent: 0,
        arr: this.props.categories.map(category => category.category)
    };

    getDonatesSum = () => {
        axios.get(`http://localhost:8091/api/v1/donates/all/projects/${this.props.id}`, {crossDomain: true}).then(response => {
            this.setState({
                donatesSum: response.data,
                donatedPercent: response.data * 100 / this.props.moneyNeeded
            })
        })
    };

    componentDidMount() {
        this.getDonatesSum();
    }

    render() {
        return (
            <div>
                <Link to={`projects/${this.props.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <Card border="primary" className="text-center mx-auto"
                          style={{width: '18rem', marginTop: '2rem'}}>
                        <Card.Img variant="top"
                                  src="https://i0.wp.com/storage.googleapis.com/blog-images-backup/1*3SVfBkNZI2f-sspiq59xcw.png?zoom=1.25&resize=391%2C321&ssl=1"/>
                        <Card.Body>
                            <Card.Title>{this.props.name}</Card.Title>

                            <Card.Text style={{height: '3rem'}}>
                                Категорії: {this.state.arr.join(", ")}
                            </Card.Text>

                            <Card.Text>
                                Статус: {this.props.status.status}
                            </Card.Text>

                            <ProgressBar doneTip="Зібрано!" donePercent={this.state.donatedPercent}
                                         doneLabel={this.state.donatesSum} undoneTip="Потрібно зібрати!"
                                         undoneLabel={this.props.moneyNeeded - this.state.donatesSum}/>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        )
    }
}
