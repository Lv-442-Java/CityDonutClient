import React from "react";
import Container from "react-bootstrap/Container";
import {Description} from "./description";
import ScrollUpButton from "react-scroll-up-button";
import {Document} from "./documentation"
import {ProjectDonates} from "./projectDonates";
import { Link, animateScroll as scroll } from "react-scroll";
import MyCustomMap from "./createNewProject/MyCustomMap"


export class ProjectScroller extends React.Component {

    render() {
        return (

            <div>
                <Container>
                    <div className="d-flex justify-content-center " style={{width:"100%", height:"35px"}}>
                        <div className= "d-flex justify-content-around align-items-center" style = {{background: "#f0f0f0", margin: "20px",
                            width:"60%", height:"35px"}}>
                            <Link
                                activeClass="active"
                                to="#description"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                Опис
                            </Link>
                            <Link
                                activeClass="active"
                                to="docs"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                Документація
                            </Link>
                            <Link

                                activeClass="active"
                                to="map"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                Розташування
                            </Link>
                            <Link

                                activeClass="active"
                                to="donates"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                Внески
                            </Link>
                            {this.props.status === "реалізація" || this.props.status === "виконаний" && <Link
                                activeClass="active"
                                to="storyboard"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                Сторіборд
                            </Link>}
                        </div>
                    </div>
                    <br/>
                    <div className="" style={{width:"80%", margin:"30px"}} id= "description">
                        <h3>Опис</h3>
                        <Description description={this.props.description}></Description>
                    </div>
                    <br/>
                    <div className="" style={{width:"80%", margin: "30px"}} id = "docs">
                        <h3>Документація</h3>
                        <Document projectId = {this.props.projectId}></Document>
                    </div>
                    <br/>
                    <div className="" style={{width:"80%", margin: "30px"}} id = "map">
                        <h3>Розташування</h3>
                        <br/>
                        <MyCustomMap location={this.props.location}></MyCustomMap>

                    </div>

                    <br/>
                    <div  style={{width:"80%", margin: "30px"}} id = "donates">
                        <h3>Внески</h3>
                        <br/>
                        <div className="">
                            <ProjectDonates projectId={this.props.projectId}></ProjectDonates>
                        </div>
                    </div>

                </Container>
                <div>
                    <ScrollUpButton />
                </div>
            </div>
        );
    }
}


