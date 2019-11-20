import React from "react";
import axios from "axios";
import CardDeck from "react-bootstrap/CardDeck";
import {ProjectsItem} from "./projectsItem";
import Container from "react-bootstrap/Container";

export default class DonatedProjects extends React.Component {

    state = {
        donatedProject: []
    };

    getDonatedProjects = () => (
        axios.get(`http://localhost:8091/api/v1/donates/projects/users/`, {withCredentials: true}).then(response => {
            this.setState({
                donatedProject: response.data
            })
        })
    );

    componentDidMount() {
        this.getDonatedProjects();
    }

    render() {
        return (
            <div>
                <Container>
                    <h1 className="d-flex justify-content-center p-5">Ваші пожертви</h1>
                    <CardDeck className="d-flex justify-content-around">
                        {this.state.donatedProject.map(element => (
                            <ProjectsItem
                                key={element.id}
                                id={element.id}
                                name={element.name}
                                categories={element.categories}
                                status={element.projectStatusDto}
                                moneyNeeded={element.moneyNeeded}
                                donateSum ={element.donateSum}
                                donateCount={element.donateCount}
                            />
                        ))}
                    </CardDeck>
                </Container>
            </div>
        )
    }
}

// import React from "react";
//
//
// export class DonatedProject extends React.Component {
//
//     state = {
//         donatesSum: 0,
//         donatedPercent: 0,
//         photoUrl: "",
//         arr: this.props.categories.map(category => category.category)
//     };
//
//     getDonatesSum = () => {
//         axios.get(`http://localhost:8091/api/v1/donates/all/projects/${this.props.id}`, {crossDomain: true}).then(response => {
//             this.setState({
//                 donatesSum: response.data,
//                 donatedPercent: response.data * 100 / this.props.moneyNeeded
//             })
//         })
//     };
//
//     getAvatar = () => {
//         axios.get(`http://localhost:8091/api/v1/project/${this.props.id}/getAvatar`, {withCredentials: true}).then(response => {
//             this.setState({
//                 photoUrl: response.data
//             })
//         })
//     };
//
//     componentDidMount() {
//         this.getDonatesSum();
//         this.getAvatar();
//     }
//
//     render() {
//         return (
//             <div className="px-2">
//                 <Link to={`projects/${this.props.id}`} style={{textDecoration: 'none', color: 'black'}}>
//                     <Card border="primary" className="text-center mx-auto"
//                           style={{width: '18rem', marginTop: '2rem'}}>
//                         <Card.Img variant="top"
//                                   src={this.state.photoUrl}/>
//                         <Card.Body>
//                             <Card.Title>{this.props.name}</Card.Title>
//
//                             <Card.Text style={{height: '3rem'}}>
//                                 Категорії: {this.state.arr.join(", ")}
//                             </Card.Text>
//
//                             <Card.Text>
//                                 Статус: {this.props.status.status}
//                             </Card.Text>
//
//                             <ProgressBar doneTip="Зібрано!" donePercent={this.state.donatedPercent}
//                                          doneLabel={this.state.donatesSum} undoneTip="Потрібно зібрати!"
//                                          undoneLabel={this.props.moneyNeeded - this.state.donatesSum}/>
//                         </Card.Body>
//                     </Card>
//                 </Link>
//             </div>
//         )
//     }
// }

