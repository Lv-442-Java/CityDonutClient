import React from "react";
import homePage from '../../img/homePage5.jpeg';
import Button from "react-bootstrap/Button";

var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${homePage})`,
    //backgroundRepeat: "no-repeat"
};

export default class HomePagePhoto extends React.Component{


    render(){
        return(
            <div style={sectionStyle}  className="content">
                <h3 style={{color:"white",  textJustify: "Left",
                    textAlign:"Left", paddingTop:"100px", paddingLeft:"30px"}}>
                    CityDonut - це краудфандингова платформа <br/> для міських ініціатив. Кожен може <br/>
                    допомогти своєму місту.</h3>
                <Button style= {{marginTop: "5%", marginRight:"10%"}}  className = "float-right " variant="primary" size="lg">
                    Подати проект
                </Button>
                <Button style= {{marginTop: "5%", marginRight:"2%"}}  className = "float-right " variant="primary" size="lg">
                    Допомогти
                </Button>

            </div>
        )

    }

}