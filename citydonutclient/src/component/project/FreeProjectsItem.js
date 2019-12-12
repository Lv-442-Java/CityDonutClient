import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import axios from '../../utils/services';

export class FreeProjectsItem extends React.Component {
    state = {
        photoUrl: '',
        arr: this.props.categories.map(category => category.category),
        text: 'ПІДПИСАТИСЯ',
        buttonColor: 'secondary',
    };

    componentDidMount() {
        this.getGallery();
    }

    getGallery = () => {
        axios.get(`http://localhost:8091/api/v1/project/${this.props.id}/gallery`,
            { withCredentials: true }).then((response) => {
            this.setState({ galleryId: response.data });
        }).then(
            this.getAvatar,
        );
    };

    getAvatar = () => {
        axios.get(`http://localhost:8091/api/v1/gallery/${this.props.id}/getAvatar`, { withCredentials: true }).then((response) => {
            this.setState({
                photoUrl: response.data,
            });
        });
    };

    subscribe = () => {
        axios.put(`http://localhost:8091/api/v1/project/${this.props.id}/addToModerate`, {}, { withCredentials: true }).then(
            this.setState({
                text: 'ВИ ПІДПИСАЛИСЯ',
                buttonColor: 'success',
            }),
        );
    };

    render() {
        return (
            <div className="px-2">
                <Card
                    border="primary"
                    className="text-center mx-auto"
                    style={{ width: '18rem', marginTop: '2rem' }}
                >
                    <Card.Img
                        style={{height: '11rem'}}
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

                        <Button
                            onClick={this.subscribe}
                            variant={this.state.buttonColor}
                        >
                            {this.state.text}
                        </Button>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}
