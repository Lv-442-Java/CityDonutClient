import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';

const FooterPage = () => {
        return (
            <MDBFooter
                style={{
                    backgroundColor: '#343A40',
                    color: 'white',
                    position: "fixed",
                    left: "0",
                    bottom: "0",
                    width: "100%"
                }}
                className="font-small pt-1">
                <div className="footer-copyright text-center py-3">
                    <MDBContainer>
                        &copy;CityDonut. 2019 -
                        {' '}
                        {new Date().getFullYear()}
                    </MDBContainer>
                </div>
            </MDBFooter>
        );
}

export default FooterPage;
