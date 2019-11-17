import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";

export class ProjectScroller extends React.Component {

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center " style={{width:"100%", height:"35px"}}>
                <div className= "d-flex justify-content-around align-items-center" style = {{background: "#f0f0f0", margin: "20px",
                    width:"80%", height:"35px"}}>
                    <Link
                        activeClass="active"
                        to="description"
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
                        to="budget"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}>
                        Бюджет
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

                </div>
                </div>
                <br/>
                <div className="" style={{width:"80%", margin:"30px"}} id= "description">
                    <h3>Опис</h3>
                    <p>text text text text </p>
                </div>
                <br/>
                <div className="" style={{width:"80%", margin: "30px"}} id = "docs">
                    <h3>Документація</h3>
                    <p>docs docs docs</p>
                </div>
                <br/>
                <div className="" style={{width:"80%", margin: "30px"}} id = "budget">
                    <h3>Бюджет</h3>
                    <p>numbers numbers numbers</p>
                </div>
                <br/>
                <div className="" style={{width:"80%", margin: "30px"}} id = "map">
                    <h3>Розташування</h3>
                    <p>map map map</p>
                </div>
            </div>
        );
    }
}








