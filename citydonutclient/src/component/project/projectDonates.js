import React from 'react';
import axios from '../../utils/services';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export class ProjectDonates extends React.Component {
    state = {
        donates: [],
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`http://localhost:8091/api/v1/donates/projects/${this.props.projectId}`,
            { withCredentials: true }).then((response) => {
            this.setState({ donates: response.data });
        });
    };

    render() {
        const { donates } = this.state;
        return (
            <div className="text-center">
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    // infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024,
                            },
                            items: 5,
                            partialVisibilityGutter: 40,
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0,
                            },
                            items: 1,
                            partialVisibilityGutter: 30,
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464,
                            },
                            items: 2,
                            partialVisibilityGutter: 30,
                        },
                    }}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {donates.map(donate => (
                        <div>
                            <Card style={{ width: '10rem', height: '11rem' }}>
                                <Card.Body>
                                    <Card.Title>
                                        {donate.sum}
                                        {' '}
₴
                                    </Card.Title>
                                    <Card.Subtitle
                                        className="mb-2 text-muted"
                                    >
                                        {donate.userFirstName}
                                        {' '}
                                        {donate.userLastName}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        {donate.date}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    }
}
