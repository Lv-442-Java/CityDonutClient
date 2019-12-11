import React from 'react';
import {MDBContainer, MDBFooter} from 'mdbreact';
import { IconContext} from "react-icons";
import {FaFacebook, FaInstagram, FaTelegram} from 'react-icons/fa';

const FooterPage = () => (
    <MDBFooter
        style={{
            backgroundColor: '#343A40',
            color: 'white',
            width: '100%'
        }}
        className="font-small pt-1c"
    >
        <div className="footer-copyright text-center py-3">
                <IconContext.Provider value={{size: "2em"}}>
                    <div style=
                             {{
                                 margin:'0 auto',
                                 width:'10%'
                             }}
                         className="d-flex justify-content-around align-items-center">
                        <div><FaTelegram /></div>
                        <div><FaFacebook /></div>
                        <div><FaInstagram /></div>
                    </div>
                </IconContext.Provider>
            <br/>
            <MDBContainer style={{top:'10px'}}>
                &copy;CityDonut. 2019 -
                {' '}
                {new Date().getFullYear()}
            </MDBContainer>
        </div>
    </MDBFooter>
);

export default FooterPage;
