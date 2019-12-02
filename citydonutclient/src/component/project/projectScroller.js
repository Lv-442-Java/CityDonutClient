import React from 'react';
import Container from 'react-bootstrap/Container';
import ScrollUpButton from 'react-scroll-up-button';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Description } from './description';
import { Document } from './documentation';
import { ProjectDonates } from './projectDonates';
import MyCustomMap from './createNewProject/MyCustomMap';
import { StoryBoardList } from '../storyBoard/storyBoardList';


export class ProjectScroller extends React.Component {
    render() {
        return (

            <div>
                <Container>
                    <div className="d-flex justify-content-center " style={{ width: '100%', height: '35px' }}>
                        <div
                            className="d-flex justify-content-around align-items-center"
                            style={{
                                background: '#f0f0f0',
                                margin: '20px',
                                width: '60%',
                                height: '35px',
                            }}
                        >
                            <Link
                                activeClass="active"
                                to="#description"
                                spy
                                smooth
                                offset={-70}
                                duration={500}
                            >
                                Опис
                            </Link>
                            <Link
                                activeClass="active"
                                to="docs"
                                spy
                                smooth
                                offset={-70}
                                duration={500}
                            >
                                Документація
                            </Link>
                            <Link

                                activeClass="active"
                                to="map"
                                spy
                                smooth
                                offset={-70}
                                duration={500}
                            >
                                Розташування
                            </Link>
                            <Link
                                activeClass="active"
                                to="donates"
                                spy
                                smooth
                                offset={-70}
                                duration={500}
                            >
                                Внески
                            </Link>
                            {(this.props.status === 'реалізація' || this.props.status === 'виконаний') && (
                                <Link
                                    activeClass="active"
                                    to="storyboard"
                                    spy
                                    smooth
                                    offset={-70}
                                    duration={500}
                                >
                                Сторіборд
                                </Link>
                            )}
                        </div>
                    </div>
                    <br />
                    <div className="" style={{ width: '80%', margin: '30px' }} id="description">
                        <h3>Опис</h3>
                        <br />
                        <h5>
Автор:
                            {this.props.ownerFirstName}
                            {' '}
                            {this.props.ownerLastName}
                        </h5>
                        <Description description={this.props.description} />
                    </div>
                    <br />
                    <div className="" style={{ width: '80%', margin: '30px' }} id="docs">
                        <h3>Документація</h3>
                        <br />
                        <Document galleryId={this.props.galleryId} />
                    </div>
                    <br />
                    <div className="" style={{ width: '80%', margin: '30px' }} id="map">
                        <h3>Розташування</h3>
                        <br />
                        <MyCustomMap location={this.props.location} />

                    </div>

                    <br />

                    <div style={{ width: '80%', margin: '30px' }} id="donates">
                        <h3>Внески</h3>
                        <br />
                        <div className="">
                            <ProjectDonates projectId={this.props.projectId} />
                        </div>
                    </div>
                    {(this.props.status === 'реалізація' || this.props.status === 'виконаний')
                    && (
                        <div style={{ width: '80%', margin: '30px' }} id="storyboard">
                            <h3>Сторіборд</h3>
                            <br />
                            <div className="">
                                <StoryBoardList projectId={this.props.projectId} />
                            </div>
                        </div>
                    )}

                </Container>
                <div>
                    <ScrollUpButton />
                </div>
            </div>
        );
    }
}
