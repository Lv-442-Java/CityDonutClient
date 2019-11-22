import React from 'react';
import UpdateProject from '../updateAxistProject/UpdateProject';
import {Chat} from '../../chat/chat';
import axios from "axios";

export class UpdateProjectPage extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <div style={{
                verticalAlign: 'top',
                height: 'calc(100% - 56px)',
            }}>
                <div style={{
                    verticalAlign: 'top',
                    width: '50%',
                    height: '100%',
                    display: "inline-block",
                    margin: "0 auto",
                    marginTop: "-25px",
                }}>
                    <UpdateProject/>
                </div>
                <div style={{
                    verticalAlign: 'top',
                    width: '50%',
                    height: '100%',
                    display: "inline-block",
                    margin: "0 auto",
                }}>
                    <Chat/>
                </div>
            </div>
        );
    }

}