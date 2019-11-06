import React from 'react';
import {Link} from "react-router-dom";

export class Base extends React.Component {

    render() {
        return (
            <div>
                <h1 >HOME!!!!!!</h1>
                <Link to='/login'>LOGIN</Link>
            </div>
        )
    }
}
