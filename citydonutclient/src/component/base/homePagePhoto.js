import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import homePage from '../../img/homePage6.jpeg';
import donut from '../../img/icon.jpg';

const sectionStyle = {
    width: '100%',
    height: '660px',
    backgroundImage: `url(${homePage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
};

export default class HomePagePhoto extends React.Component {
    render() {
        return (
            <div style={sectionStyle} className="content">
                <h2 style={{
                    textJustify: 'Left',
                    textAlign: 'Left',
                    paddingTop: '100px',
                    paddingLeft: '50px',
                }}
                >
                    CityDonut - це краудфандингова платформа
                    {' '}
                    <br/>
                    {' '}
                    для міських ініціатив. Кожен може
                    {' '}
                    <br/>
                    допомогти своєму місту.
                </h2>
                <Link style={{color: 'white'}} to="/projects">
                    <Button
                        style={{
                            textJustify: 'center',
                            marginTop: '10%',
                            marginRight: '10%',
                            height: '10%',
                            width: '15%',
                            borderColor: '#B87FA5',
                            backgroundColor: '#792257',
                            opacity: '90%',
                        }}
                        className="float-right text-center"
                        variant="primary"
                        size="lg"
                    >
                        Допомогти
                    </Button>
                </Link>
                <Link style={{color: 'white'}} to="/project/create">
                    <Button
                        style={{
                            marginTop: '10%',
                            marginRight: '3%',
                            height: '10%',
                            width: '15%',
                            borderColor: '#B87FA5',
                            backgroundColor: '#792257',
                            opacity: '90%',
                        }}
                        className="float-right "
                        variant="primary"
                        size="lg"
                    >
                        Подати проект
                    </Button>
                </Link>
                <div style={{textAlign: 'center', marginTop: '25%', marginRight: '3%'}}>
                    <Link
                        style={{fontSize: '30px', color: 'white'}}
                        activeClass="active"
                        to="#container"
                        spy
                        smooth
                        offset={-70}
                        duration={500}
                    >
                        Переглянути успішні проекти
                    </Link>
                    <img
                        style={{marginTop: '0.7%', marginLeft: '0.5%'}}
                        src={donut}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </div>
            </div>
        );
    }
}
