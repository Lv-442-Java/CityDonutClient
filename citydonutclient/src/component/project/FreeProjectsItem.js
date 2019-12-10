import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from '../../utils/services';
import ProgressBar from '../progressBar/progressBar';

export class FreeProjectsItem extends React.Component {
    state = {
        photoUrl: '',
        arr: this.props.categories.map(category => category.category),
    };

    componentDidMount() {
        this.getAvatar();
    }

    getAvatar = () => {
        axios.get(`http://localhost:8091/api/v1/gallery/${this.props.id}/getAvatar`, { withCredentials: true }).then((response) => {
            this.setState({
                photoUrl: response.data,
            });
        });
    };

    render() {
        return (
            <div className="px-2">
                <Link to={`/projects/${this.props.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <Card
                        border="primary"
                        className="text-center mx-auto"
                        style={{ width: '18rem', marginTop: '2rem' }}
                    >
                        <Card.Img
                            variant="top"
                            src={this.state.photoUrl}
                        />
                        <Card.Body>
                            <Card.Title>{this.props.name}</Card.Title>

                            <Card.Text style={{ height: '3rem' }}>
                                Категорії:
                                {' '}
                                {this.state.arr.join(', ')}
                            </Card.Text>

                            <Card.Text>
                                Статус:
                                {' '}
                                {this.props.status.status}
                            </Card.Text>

                            <Card.Text>
                                {this.props.donateSum && `Сума: ${`${this.props.donateSum} ₴`}`}
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Link>
            </div>
        );
    }
}
