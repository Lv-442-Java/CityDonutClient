import React from "react";
import homePage from '../../img/homePage6.jpeg';
import donut from '../../img/icon.jpg';
import Button from "react-bootstrap/Button";
import {Link} from "react-scroll";

var sectionStyle = {
    width: "100%",
    height: "660px",
    backgroundImage: `url(${homePage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
    //backgroundRepeat: "no-repeat"
    //#E8C7DD
};

export default class HomePagePhoto extends React.Component{

   /* scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: 'containerId'
    });
    }*/
//color:"#525150",
    //F373C2
    //#52494F grey
    render(){
        return(
            <div style={sectionStyle}  className="content">
                <h2 style={{ textJustify: "Left",
                    textAlign:"Left", paddingTop:"100px", paddingLeft:"50px"}}>
                    CityDonut - це краудфандингова платформа <br/> для міських ініціатив. Кожен може <br/>
                    допомогти своєму місту.</h2>
                <Button style= {{marginTop: "10%", marginRight:"10%", height:"10%",
                     width:"15%",borderColor:"#B87FA5", backgroundColor: "#792257", opacity:"90%"}}  className = "float-right " variant="primary" size="lg">
                    Подати проект
                </Button>
                <Button style= {{marginTop: "10%", marginRight:"3%", height:"10%",
                    width:"15%", borderColor:"#B87FA5", backgroundColor: "#792257", opacity:"90%" }}  className = "float-right " variant="primary" size="lg">
                    Допомогти
                </Button>
                <div style={{textAlign:"center", marginTop: "25%", marginRight:"3%"}}>
                <Link style={{fontSize:"30px", color:"white"}}
                    activeClass="active"
                    to="#container"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}>
                    Переглянути успішні проекти
                </Link>
                    <img style ={{marginTop:"0.7%", marginLeft:"0.5%"}}
                        src={donut}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </div>
            </div>
        )

    }

}