import React from "react";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import axios from "axios";
import ProgressBar from "../progressBar/progressBar";
import img from "../../img/test.png"

export class ProjectsItem extends React.Component {

    state = {
        donatesSum: 0,
        donatedPercent: 0,
        photoUrl: "",
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

    getAvatar = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.props.id}/getAvatar`, {withCredentials: true}).then(response => {
            this.setState({
                photoUrl: response.data
            })
        })
    };

    componentDidMount() {
        this.getDonatesSum();
        this.getAvatar();
    }

    render() {
        return (
            <div>
                <Link to={`projects/${this.props.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <Card border="primary" className="text-center mx-auto"
                          style={{width: '18rem', marginTop: '2rem'}}>
                        <Card.Img variant="top"
                                  src={this.state.photoUrl}/>
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
